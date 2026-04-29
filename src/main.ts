import './styles.css';
import { applyInput, createTrainerState, getCurrentCue, isComplete, normalizeTrainingText } from './core/trainer';
import { clearPreferences, loadPreferences, savePreferences } from './core/storage';
import { trainerConfig } from './data/config';
import { appCopy } from './i18n';
import type { AppCopy } from './i18n/types';
import type {
  AppLocale,
  KeyCommand,
  KeyboardLayout,
  KeyboardLayoutId,
  StoredPreferences,
  TrainerConfig,
  TrainingSelection
} from './types';

type Screen = 'welcome' | 'trainer' | 'settings';

interface AppState {
  screen: Screen;
  config: TrainerConfig;
  preferences: StoredPreferences;
  trainer: ReturnType<typeof createTrainerState>;
  flashError: boolean;
}

const appRoot = document.querySelector<HTMLDivElement>('#app');

if (!appRoot) {
  throw new Error('App root was not found');
}

const app = appRoot;
const defaultSelection = createDefaultSelection(trainerConfig);
let state: AppState = {
  screen: 'welcome',
  config: trainerConfig,
  preferences: loadPreferences(defaultSelection),
  trainer: createTrainerState(''),
  flashError: false
};

state.preferences.selection = sanitizeSelection(state.config, state.preferences.selection);

window.addEventListener('keydown', (event) => {
  if (state.screen !== 'trainer' || event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.key.length === 1) {
    event.preventDefault();
  }

  const commandMap = getActiveCommandMap(state);
  const result = applyInput(state.trainer, commandMap, event.key);
  state = { ...state, trainer: result.state };

  if (result.outcome === 'incorrect') {
    flashError();
    return;
  }

  render();
});

render();

function render(): void {
  const copy = getCopy(state);

  document.documentElement.lang = state.preferences.selection.appLocale;
  app.replaceChildren();
  app.className = state.flashError ? 'app app--error' : 'app';

  if (state.screen === 'welcome') {
    app.append(renderWelcome(copy));
  } else if (state.screen === 'trainer') {
    app.append(renderTrainer(copy));
  } else {
    app.append(renderSettings(copy));
  }
}

function renderWelcome(copy: AppCopy): HTMLElement {
  const layout = getActiveLayout(state);
  const localeSelect = renderLocaleSelect(copy);
  const layoutSelect = renderLayoutSelect(copy);

  const startButton = el('button', { className: 'primary-action', type: 'button' }, copy.start);
  startButton.addEventListener('click', startTrainer);

  const settingsButton = el('button', { className: 'secondary-action', type: 'button' }, copy.customTextAction);
  settingsButton.addEventListener('click', () => {
    state = { ...state, screen: 'settings' };
    render();
  });

  return el(
    'main',
    { className: 'screen welcome-screen' },
    el(
      'section',
      { className: 'welcome-layout' },
      el(
        'div',
        { className: 'intro-copy' },
        el('h1', {}, copy.welcomeTitle),
        el('p', { className: 'lead' }, copy.welcomeLead),
        el('div', { className: 'notice-list' }, renderNotice(copy.architectureNote)),
        renderInfoList(copy.methodStepsTitle, copy.methodSteps),
        renderInfoList(copy.fingerRulesTitle, copy.fingerRules)
      ),
      el(
        'aside',
        { className: 'start-panel' },
        localeSelect,
        layoutSelect,
        el(
          'div',
          { className: 'readonly-field' },
          el('span', { className: 'field-label' }, copy.textMode),
          el('strong', {}, isUsingCustomText(state) ? copy.customTextLabel : copy.defaultTextLabel),
          el('small', {}, getActiveTrainingText(state).slice(0, 92))
        ),
        el('div', { className: 'action-row' }, startButton, settingsButton)
      )
    )
  );
}

function renderTrainer(copy: AppCopy): HTMLElement {
  const layout = getActiveLayout(state);
  const commandMap = getActiveCommandMap(state);
  const cue = getCurrentCue(state.trainer, commandMap);
  const progress = state.trainer.targetText.length
    ? Math.round((state.trainer.cursor / state.trainer.targetText.length) * 100)
    : 100;
  const complete = isComplete(state.trainer);
  const command = cue?.command ?? null;

  const settingsButton = el('button', { className: 'icon-text-action', type: 'button' }, copy.settings);
  settingsButton.addEventListener('click', () => {
    state = { ...state, screen: 'settings' };
    render();
  });

  const restartButton = el('button', { className: 'secondary-action', type: 'button' }, copy.restart);
  restartButton.addEventListener('click', startTrainer);

  const homeButton = el('button', { className: 'secondary-action', type: 'button' }, copy.back);
  homeButton.addEventListener('click', () => {
    state = { ...state, screen: 'welcome' };
    render();
  });

  return el(
    'main',
    { className: 'screen trainer-screen' },
    el(
      'section',
      { className: 'command-banner' },
      el('span', { className: 'field-label' }, copy.sayCommand),
      complete
        ? el('strong', { className: 'command-banner__text' }, copy.complete)
        : el('strong', { className: 'command-banner__text' }, command?.spokenCommand ?? copy.unsupportedChar),
      complete
        ? null
        : el('span', { className: 'command-banner__char' }, cue?.char === ' ' ? copy.space : cue?.char ?? '')
    ),
    el(
      'section',
      { className: 'trainer-grid' },
      el(
        'div',
        { className: 'practice-zone' },
        el(
          'div',
          { className: 'trainer-meta' },
          el('span', {}, layout.label[state.preferences.selection.appLocale]),
          el('span', {}, `${progress}%`),
          el('span', {}, `${copy.errorCount}: ${state.trainer.errorCount}`)
        ),
        el('div', { className: 'target-text', ariaLabel: copy.textLabel }, ...renderTextSpans()),
        el('div', { className: 'typed-line', ariaLabel: copy.textLabel }, state.trainer.typedText || ' '),
        renderHands(command),
        complete
          ? el(
              'div',
              { className: 'completion' },
              el('h2', {}, copy.finishedTitle),
              el('p', {}, copy.finishedText)
            )
          : null
      ),
      el(
        'aside',
        { className: 'cue-panel' },
        el('span', { className: 'field-label' }, copy.currentChar),
        complete
          ? el('strong', { className: 'cue-char' }, '✓')
          : el('span', { className: 'cue-char' }, cue?.char === ' ' ? copy.space : cue?.char ?? ''),
        !complete && cue && !cue.supported ? renderNotice(copy.unsupportedHint, 'warning') : null,
        renderNotice(copy.trainerHint),
        renderInfoList(copy.trainerRulesTitle, copy.trainerRules, 'compact'),
        el('div', { className: 'action-column' }, settingsButton, restartButton, homeButton)
      )
    )
  );
}

function renderSettings(copy: AppCopy): HTMLElement {
  const layout = getActiveLayout(state);
  const customText = state.preferences.customTexts[layout.id] ?? layout.defaultText;
  const textarea = el('textarea', {
    className: 'text-editor',
    rows: 10,
    value: customText
  }) as HTMLTextAreaElement;
  const useCustom = el('input', {
    type: 'checkbox',
    checked: isUsingCustomText(state)
  }) as HTMLInputElement;

  const saveButton = el('button', { className: 'primary-action', type: 'button' }, copy.save);
  saveButton.addEventListener('click', () => {
    const nextPreferences: StoredPreferences = {
      ...state.preferences,
      customTexts: {
        ...state.preferences.customTexts,
        [layout.id]: textarea.value
      },
      useCustomTextByLayout: {
        ...state.preferences.useCustomTextByLayout,
        [layout.id]: useCustom.checked
      }
    };

    updatePreferences(nextPreferences);
    startTrainer();
  });

  const resetButton = el('button', { className: 'secondary-action', type: 'button' }, copy.reset);
  resetButton.addEventListener('click', () => {
    clearPreferences();
    state = {
      ...state,
      preferences: loadPreferences(createDefaultSelection(state.config)),
      screen: 'welcome'
    };
    render();
  });

  const backButton = el('button', { className: 'secondary-action', type: 'button' }, copy.back);
  backButton.addEventListener('click', () => {
    state = { ...state, screen: 'welcome' };
    render();
  });

  return el(
    'main',
    { className: 'screen settings-screen' },
    el(
      'section',
      { className: 'settings-layout' },
      el(
        'div',
        { className: 'settings-copy' },
        el('p', { className: 'eyebrow' }, copy.settingsEyebrow),
        el('h1', {}, copy.settingsTitle),
        el('p', { className: 'lead' }, copy.settingsLead)
      ),
      el(
        'form',
        { className: 'settings-form' },
        renderLocaleSelect(copy),
        renderLayoutSelect(copy),
        el('label', { className: 'toggle-field' }, useCustom, el('span', {}, copy.useCustomText)),
        el('label', { className: 'field' }, el('span', { className: 'field-label' }, copy.textLabel), textarea),
        el('div', { className: 'action-row' }, saveButton, resetButton, backButton)
      )
    )
  );
}

function renderLocaleSelect(copy: AppCopy): HTMLElement {
  const select = el('select', { className: 'field-control', id: 'app-locale' });

  for (const locale of Object.keys(appCopy) as AppLocale[]) {
    select.append(
      el(
        'option',
        {
          value: locale,
          selected: locale === state.preferences.selection.appLocale
        },
        locale === 'ru' ? 'Русский' : 'English'
      )
    );
  }

  select.addEventListener('change', () => {
    const appLocale = select.value === 'en' ? 'en' : 'ru';
    updatePreferences({
      ...state.preferences,
      selection: sanitizeSelection(state.config, {
        ...state.preferences.selection,
        appLocale
      })
    });
    render();
  });

  return el('label', { className: 'field' }, el('span', { className: 'field-label' }, copy.interfaceLanguage), select);
}

function renderLayoutSelect(copy: AppCopy): HTMLElement {
  const select = el('select', { className: 'field-control', id: 'keyboard-layout' });
  const appLocale = state.preferences.selection.appLocale;

  for (const layout of state.config.keyboardLayouts) {
    select.append(
      el(
        'option',
        {
          value: layout.id,
          selected: layout.id === state.preferences.selection.keyboardLayout
        },
        layout.label[appLocale]
      )
    );
  }

  select.addEventListener('change', () => {
    updatePreferences({
      ...state.preferences,
      selection: sanitizeSelection(state.config, {
        ...state.preferences.selection,
        keyboardLayout: select.value as KeyboardLayoutId
      })
    });
    render();
  });

  return el(
    'label',
    { className: 'field' },
    el('span', { className: 'field-label' }, copy.keyboardLayout),
    select,
    el('small', { className: 'field-help' }, getActiveLayout(state).note[appLocale])
  );
}

function renderTextSpans(): HTMLElement[] {
  return Array.from(state.trainer.targetText).map((char, index) => {
    let className = 'text-char';

    if (index < state.trainer.cursor) {
      className += ' text-char--done';
    } else if (index === state.trainer.cursor) {
      className += ' text-char--current';
    }

    return el('span', { className }, char === ' ' ? '\u00a0' : char);
  });
}

function renderInfoList(title: string, items: string[], density: 'normal' | 'compact' = 'normal'): HTMLElement {
  return el(
    'section',
    { className: density === 'compact' ? 'info-block info-block--compact' : 'info-block' },
    el('h2', {}, title),
    el('ul', {}, ...items.map((item) => el('li', {}, item)))
  );
}

function renderHands(command: KeyCommand | null): SVGSVGElement {
  const activeHand = command?.hand;
  const activeFinger = command?.fingerNumber;

  return svgEl(
    'svg',
    {
      class: 'hands-guide',
      viewBox: '0 0 760 250',
      role: 'img',
      'aria-label': 'hand guide'
    },
    renderHand('left', 42, activeHand, activeFinger),
    renderHand('right', 424, activeHand, activeFinger)
  );
}

function renderHand(
  hand: 'left' | 'right',
  x: number,
  activeHand: 'left' | 'right' | undefined,
  activeFinger: 1 | 2 | 3 | 4 | undefined
): SVGGElement {
  const activePalm = activeHand === hand;
  const fingers =
    hand === 'left'
      ? [
          { number: 4, points: fingerPoints(22, 118, 60, 34, 92, 127), color: 'orange' },
          { number: 3, points: fingerPoints(80, 120, 94, 8, 118, 120), color: 'blue' },
          { number: 2, points: fingerPoints(134, 122, 180, 22, 194, 132), color: 'pink' },
          { number: 1, points: thumbPoints('left'), color: 'white' }
        ]
      : [
          { number: 1, points: thumbPoints('right'), color: 'white' },
          { number: 2, points: fingerPoints(36, 132, 50, 22, 94, 122), color: 'yellow' },
          { number: 3, points: fingerPoints(112, 120, 126, 8, 150, 120), color: 'green' },
          { number: 4, points: fingerPoints(176, 127, 208, 34, 246, 118), color: 'orange' }
        ];
  const palmPath =
    hand === 'left'
      ? 'M42 124 C58 111 83 106 111 108 C134 110 153 117 168 130 L167 151 C180 150 191 140 204 129 L226 151 C203 174 186 205 190 232 L46 232 C35 204 29 174 33 145 C35 136 38 129 42 124 Z'
      : 'M206 124 C190 111 165 106 137 108 C114 110 95 117 80 130 L81 151 C68 150 57 140 44 129 L22 151 C45 174 62 205 58 232 L202 232 C213 204 219 174 215 145 C213 136 210 129 206 124 Z';

  return svgEl(
    'g',
    { class: 'hand', 'data-hand': hand, transform: `translate(${x}, 10)` },
    ...fingers.map((finger) => {
      const active = activeHand === hand && activeFinger === finger.number;
      return svgEl(
        'g',
        {
          class: active ? 'hand__digit hand__digit--active' : 'hand__digit',
          'data-finger-number': String(finger.number)
        },
        svgEl('path', {
          class: `hand__finger hand__finger--${finger.color}${active ? ' hand__finger--active' : ''}`,
          d: finger.points.path
        }),
        svgEl(
          'text',
          {
            class: active ? 'hand__number hand__number--active' : 'hand__number',
            x: finger.points.labelX,
            y: finger.points.labelY,
            'text-anchor': 'middle'
          },
          String(finger.number)
        )
      );
    }),
    svgEl('path', {
      class: activePalm ? 'hand__palm hand__palm--active' : 'hand__palm',
      d: palmPath
    })
  );
}

interface FingerShape {
  path: string;
  labelX: number;
  labelY: number;
}

function fingerPoints(baseLeftX: number, baseLeftY: number, tipX: number, tipY: number, baseRightX: number, baseRightY: number): FingerShape {
  return {
    path: [
      `M${baseLeftX} ${baseLeftY}`,
      `L${tipX - 15} ${tipY + 7}`,
      `Q${tipX} ${tipY - 10} ${tipX + 15} ${tipY + 7}`,
      `L${baseRightX} ${baseRightY}`,
      'Z'
    ].join(' '),
    labelX: tipX,
    labelY: tipY + 16
  };
}

function thumbPoints(hand: 'left' | 'right'): FingerShape {
  if (hand === 'left') {
    return {
      path: 'M154 137 C180 129 203 116 225 101 L247 124 C219 143 201 162 181 179 C166 169 157 155 154 137 Z',
      labelX: 220,
      labelY: 132
    };
  }

  return {
    path: 'M94 137 C68 129 45 116 23 101 L1 124 C29 143 47 162 67 179 C82 169 91 155 94 137 Z',
    labelX: 28,
    labelY: 132
  };
}

function renderNotice(message: string, tone: 'info' | 'warning' = 'info'): HTMLElement {
  return el('p', { className: `notice notice--${tone}` }, message);
}

function startTrainer(): void {
  const text = getActiveTrainingText(state);
  state = {
    ...state,
    screen: 'trainer',
    trainer: createTrainerState(text)
  };
  render();
}

function flashError(): void {
  state = { ...state, flashError: true };
  render();
  window.setTimeout(() => {
    state = { ...state, flashError: false };
    render();
  }, 100);
}

function updatePreferences(preferences: StoredPreferences): void {
  state = { ...state, preferences };
  savePreferences(preferences);
}

function getActiveTrainingText(appState: AppState): string {
  const layout = getActiveLayout(appState);
  const rawText = isUsingCustomText(appState)
    ? appState.preferences.customTexts[layout.id] ?? ''
    : layout.defaultText;
  const normalized = normalizeTrainingText(rawText, layout.inputLocale);

  return normalized || normalizeTrainingText(layout.defaultText, layout.inputLocale);
}

function isUsingCustomText(appState: AppState): boolean {
  const layout = getActiveLayout(appState);
  return Boolean(appState.preferences.useCustomTextByLayout[layout.id]);
}

function getActiveLayout(appState: AppState): KeyboardLayout {
  return (
    appState.config.keyboardLayouts.find(
      (layout) => layout.id === appState.preferences.selection.keyboardLayout
    ) ?? appState.config.keyboardLayouts[0]
  );
}

function getActiveCommandMap(appState: AppState) {
  const layout = getActiveLayout(appState);
  return layout.commandsByLocale[appState.preferences.selection.appLocale];
}

function getCopy(appState: AppState): AppCopy {
  return appCopy[appState.preferences.selection.appLocale];
}

function createDefaultSelection(config: TrainerConfig): TrainingSelection {
  const appLocale = detectPreferredAppLocale(config);

  return {
    appLocale,
    keyboardLayout: getDefaultKeyboardLayoutForLocale(config, appLocale)
  };
}

function detectPreferredAppLocale(config: TrainerConfig): AppLocale {
  const supportedLocales = Object.keys(appCopy) as AppLocale[];
  const browserLocales = [navigator.language, ...Array.from(navigator.languages ?? [])];

  for (const browserLocale of browserLocales) {
    const language = browserLocale.split('-')[0];
    const supportedLocale = supportedLocales.find((locale) => locale === language);

    if (supportedLocale) {
      return supportedLocale;
    }
  }

  return config.defaultAppLocale;
}

function getDefaultKeyboardLayoutForLocale(config: TrainerConfig, appLocale: AppLocale): KeyboardLayoutId {
  if (appLocale === 'en') {
    return 'en-us-qwerty';
  }

  if (appLocale === 'ru') {
    return 'ru-qwerty';
  }

  return config.defaultKeyboardLayout;
}

function sanitizeSelection(config: TrainerConfig, selection: TrainingSelection): TrainingSelection {
  const appLocale = selection.appLocale === 'en' ? 'en' : 'ru';
  const layout =
    config.keyboardLayouts.find((item) => item.id === selection.keyboardLayout) ??
    config.keyboardLayouts.find((item) => item.id === config.defaultKeyboardLayout) ??
    config.keyboardLayouts[0];

  return {
    appLocale,
    keyboardLayout: layout.id
  };
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & Record<string, unknown> = {},
  ...children: Array<HTMLElement | SVGElement | string | null>
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);

  setProps(node, props);

  for (const child of children) {
    if (child !== null) {
      node.append(child);
    }
  }

  return node;
}

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  props: Record<string, unknown> = {},
  ...children: Array<SVGElement | string | null>
): SVGElementTagNameMap[K] {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);

  setProps(node, props);

  for (const child of children) {
    if (child !== null) {
      node.append(child);
    }
  }

  return node;
}

function setProps(node: Element, props: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) {
      continue;
    }

    if (node instanceof SVGElement) {
      node.setAttribute(key, String(value));
    } else if (key in node) {
      (node as unknown as Record<string, unknown>)[key] = value;
    } else {
      node.setAttribute(key, String(value));
    }
  }
}
