import './styles.css';
import {
  applyInput,
  createTrainerState,
  getCurrentCue,
  isComplete,
  normalizeCustomTrainingText,
  normalizeTrainingText
} from './core/trainer';
import { clearPreferences, loadPreferences, savePreferences } from './core/storage';
import { trainerConfig } from './data/config';
import { handGuideAreas, handGuideFingerLabels, handGuideViewBox } from './data/handGuideAreas';
import type { FingerHandGuideArea, ThumbHandGuideArea } from './data/handGuideAreas';
import { appCopy } from './i18n';
import type { AppCopy } from './i18n/types';
import type {
  AppLocale,
  FingerNumber,
  Hand,
  KeyCommand,
  KeyboardLayout,
  KeyboardLayoutId,
  LocalizedText,
  StoredPreferences,
  TrainerStats,
  TrainerConfig,
  TrainingSelection,
  VisualTheme
} from './types';

type Screen = 'welcome' | 'trainer' | 'settings';

const handsGuideAsset = `${import.meta.env.BASE_URL}assets/hands.svg`;
const keyboardAsset = `${import.meta.env.BASE_URL}assets/keyboard.png`;
const supportUrl = 'https://ko-fi.com/coffeedev2k';
const activeInputPauseMs = 5000;
const skillTargetMs = 3 * 60 * 60 * 1000;

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
let pendingDeadKey = false;
let lastCompositionData: string | null = null;

state.preferences.selection = sanitizeSelection(state.config, state.preferences.selection);

window.addEventListener('keydown', (event) => {
  if (state.screen !== 'trainer' || event.ctrlKey || event.metaKey) {
    return;
  }

  if (event.key === 'Dead') {
    pendingDeadKey = true;
    return;
  }

  if (event.key === 'Shift' || event.key === 'AltGraph' || event.key === 'Compose') {
    handleTrainerInput(event.key);
    return;
  }

  if (event.altKey || pendingDeadKey) {
    return;
  }

  if (event.key.length === 1) {
    event.preventDefault();
    handleTrainerInput(event.key);
  }
});

function handleTrainerInput(rawInput: string): void {
  const commandMap = getActiveCommandMap(state);
  const previousTrainer = state.trainer;
  const result = applyInput(previousTrainer, commandMap, rawInput);
  const preferences =
    (result.outcome === 'correct' || result.outcome === 'complete') && result.state.cursor > previousTrainer.cursor
      ? updateStatsForCorrectInput(state.preferences, previousTrainer)
      : state.preferences;
  const preferencesChanged = preferences !== state.preferences;

  state = { ...state, preferences, trainer: result.state };

  if (preferencesChanged) {
    savePreferences(preferences);
  }

  if (result.outcome === 'incorrect') {
    flashError();
  } else {
    render();
  }
}

function render(): void {
  const copy = getCopy(state);

  document.documentElement.lang = state.preferences.selection.appLocale;
  app.replaceChildren();
  app.className = `app app--theme-${state.preferences.theme}${state.flashError ? ' app--error' : ''}`;

  if (state.screen === 'welcome') {
    app.append(renderWelcome(copy));
  } else if (state.screen === 'trainer') {
    app.append(renderTrainer(copy));
    focusTrainerInput();
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
        renderInfoList(copy.fingerRulesTitle, copy.fingerRules),
        renderKeyboardReference()
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
        el('div', { className: 'action-row' }, startButton, settingsButton),
        renderShareLinks()
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
          el('span', {}, localizedText(layout.label, state.preferences.selection.appLocale)),
          el('span', {}, `${progress}%`),
          el('span', {}, `${copy.errorCount}: ${state.trainer.errorCount}`)
        ),
        renderInputCapture(),
        renderStats(state.preferences.stats),
        el('div', { className: 'target-text', ariaLabel: copy.textLabel }, ...renderTextSpans()),
        el('div', { className: 'typed-line', ariaLabel: copy.textLabel }, state.trainer.typedText || ' '),
        renderHands(command, cue?.char ?? null),
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
        renderErrorReview(state.trainer.errorsByChar),
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
  const themeSelect = renderThemeSelect();

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
      },
      theme: parseTheme(themeSelect.value)
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
        el('label', { className: 'field' }, el('span', { className: 'field-label' }, extraLabel('themeLabel')), themeSelect),
        el('label', { className: 'toggle-field' }, useCustom, el('span', {}, copy.useCustomText)),
        el('label', { className: 'field' }, el('span', { className: 'field-label' }, copy.textLabel), textarea),
        renderSupportBlock(copy),
        el('div', { className: 'action-row' }, saveButton, resetButton, backButton)
      )
    )
  );
}

function renderSupportBlock(copy: AppCopy): HTMLElement {
  return el(
    'section',
    { className: 'support-block', ariaLabel: copy.supportTitle },
    el('div', {}, el('h2', {}, copy.supportTitle), el('p', {}, copy.supportText)),
    el(
      'a',
      {
        className: 'support-link',
        href: supportUrl,
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      copy.supportAction
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
        localeLabel(locale)
      )
    );
  }

  select.addEventListener('change', () => {
    const appLocale = isAppLocale(select.value) ? select.value : state.config.defaultAppLocale;
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
        localizedText(layout.label, appLocale)
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
    el('small', { className: 'field-help' }, localizedText(getActiveLayout(state).note, appLocale))
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

function renderKeyboardReference(): HTMLElement {
  return el(
    'figure',
    { className: 'keyboard-reference' },
    el('img', {
      src: keyboardAsset,
      alt: extraLabel('keyboardAlt')
    })
  );
}

function renderShareLinks(): HTMLElement {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(extraLabel('shareText'));
  const shareItems = [
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${url}&text=${title}`
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${title}%20${url}`
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`
    },
    {
      label: 'Email',
      href: `mailto:?subject=MatrixType&body=${title}%20${url}`
    }
  ];

  return el(
    'section',
    { className: 'share-links', ariaLabel: extraLabel('shareTitle') },
    el('span', { className: 'field-label' }, extraLabel('shareTitle')),
    el(
      'div',
      { className: 'share-links__row' },
      ...shareItems.map((item) =>
        el(
          'a',
          {
            className: 'share-link',
            href: item.href,
            target: '_blank',
            rel: 'noreferrer'
          },
          item.label
        )
      )
    )
  );
}

function renderStats(stats: TrainerStats): HTMLElement {
  const mastered = stats.activeMs >= skillTargetMs;
  const activeMinutes = stats.activeMs / 60000;
  const speed = activeMinutes > 0 ? Math.round(stats.typedWords / activeMinutes) : 0;

  return el(
    'section',
    { className: 'stats-grid', ariaLabel: extraLabel('statsTitle') },
    renderStatCard(
      extraLabel('activeTime'),
      `${formatDuration(stats.activeMs)} / ${formatDuration(skillTargetMs)}${mastered ? ' 🎆🎆🎆' : ''}`,
      mastered
    ),
    renderStatCard(extraLabel('typedChars'), formatNumber(stats.typedChars)),
    renderStatCard(extraLabel('typedWords'), formatNumber(stats.typedWords)),
    renderStatCard(extraLabel('speed'), `${formatNumber(speed)} wpm`)
  );
}

function renderStatCard(label: string, value: string, mastered = false): HTMLElement {
  return el(
    'div',
    { className: mastered ? 'stat-card stat-card--mastered' : 'stat-card' },
    el('span', { className: 'field-label' }, label),
    el('strong', {}, value)
  );
}

function renderErrorReview(errorsByChar: Record<string, number>): HTMLElement | null {
  const items = Object.entries(errorsByChar)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 5);

  if (!items.length) {
    return null;
  }

  return el(
    'section',
    { className: 'error-review' },
    el('h2', {}, extraLabel('errorReviewTitle')),
    el(
      'ul',
      {},
      ...items.map(([char, count]) =>
        el(
          'li',
          {},
          el('span', { className: 'error-review__char' }, char === ' ' ? extraLabel('spaceChar') : char),
          el('span', {}, String(count))
        )
      )
    )
  );
}

function renderThemeSelect(): HTMLSelectElement {
  const select = el('select', { className: 'field-control', id: 'visual-theme' }) as HTMLSelectElement;
  const themes: Array<{ id: VisualTheme; label: string }> = [
    { id: 'day', label: extraLabel('themeDay') },
    { id: 'night', label: extraLabel('themeNight') }
  ];

  for (const theme of themes) {
    select.append(
      el(
        'option',
        {
          value: theme.id,
          selected: theme.id === state.preferences.theme
        },
        theme.label
      )
    );
  }

  return select;
}

function renderInputCapture(): HTMLTextAreaElement {
  const input = el('textarea', {
    className: 'input-capture',
    ariaLabel: 'typing input',
    autoCapitalize: 'off',
    autoComplete: 'off',
    spellcheck: false
  }) as HTMLTextAreaElement;

  input.addEventListener('input', (event) => {
    const data = (event as InputEvent).data ?? input.value;
    input.value = '';

    if (!data) {
      return;
    }

    if (data === lastCompositionData) {
      lastCompositionData = null;
      pendingDeadKey = false;
      return;
    }

    pendingDeadKey = false;
    handleInputText(data);
  });

  input.addEventListener('compositionend', (event) => {
    if (!event.data) {
      return;
    }

    lastCompositionData = event.data;
    pendingDeadKey = false;
    input.value = '';
    handleInputText(event.data);
  });

  return input;
}

function handleInputText(text: string): void {
  for (const char of Array.from(text)) {
    handleTrainerInput(char);
  }
}

function focusTrainerInput(): void {
  const input = app.querySelector<HTMLTextAreaElement>('.input-capture');
  input?.focus({ preventScroll: true });
}

function renderHands(command: KeyCommand | null, cueChar: string | null): SVGSVGElement {
  const activeHand = command?.hand;
  const activeFinger = command?.fingerNumber;
  const activeThumbs = cueChar === ' ';

  return svgEl(
    'svg',
    {
      class: 'hands-guide',
      viewBox: `0 0 ${handGuideViewBox.width} ${handGuideViewBox.height}`,
      role: 'img',
      'aria-label': 'hand guide'
    },
    svgEl('rect', {
      class: 'hands-guide__background',
      x: '0',
      y: '0',
      width: String(handGuideViewBox.width),
      height: String(handGuideViewBox.height)
    }),
    svgEl('image', {
      class: 'hands-guide__image',
      href: handsGuideAsset,
      x: '0',
      y: '0',
      width: String(handGuideViewBox.width),
      height: String(handGuideViewBox.height)
    }),
    renderHandOverlay('left', activeHand, activeFinger, activeThumbs),
    renderHandOverlay('right', activeHand, activeFinger, activeThumbs)
  );
}

function renderHandOverlay(
  hand: Hand,
  activeHand: Hand | undefined,
  activeFinger: FingerNumber | undefined,
  activeThumbs: boolean
): SVGGElement {
  const activePalm = activeHand === hand;
  const palm = handGuideAreas.find((area) => area.hand === hand && area.kind === 'palm');
  const thumb = handGuideAreas.find((area): area is ThumbHandGuideArea => area.hand === hand && area.kind === 'thumb');
  const fingerOrder: FingerNumber[] = hand === 'left' ? [4, 3, 2, 1] : [1, 2, 3, 4];
  const fingers = fingerOrder.map((fingerNumber): FingerHandGuideArea => {
    const area = handGuideAreas.find(
      (candidate) => candidate.hand === hand && candidate.kind === 'finger' && candidate.fingerNumber === fingerNumber
    );

    if (!area || area.kind !== 'finger') {
      throw new Error(`Missing ${hand} hand finger ${fingerNumber} guide area`);
    }

    return area;
  });

  if (!palm) {
    throw new Error(`Missing ${hand} hand palm guide area`);
  }

  if (!thumb) {
    throw new Error(`Missing ${hand} hand thumb guide area`);
  }

  return svgEl(
    'g',
    { class: 'hand', 'data-hand': hand },
    svgEl('path', {
      class: activePalm ? 'hand__palm hand__palm--active' : 'hand__palm',
      d: palm.d,
      transform: palm.transform
    }),
    svgEl('path', {
      class: activeThumbs ? 'hand__thumb hand__thumb--active' : 'hand__thumb',
      d: thumb.d,
      transform: thumb.transform
    }),
    ...fingers.map((area) => {
      const fingerNumber = area.fingerNumber;
      const label = handGuideFingerLabels[hand][fingerNumber];
      const active = activeHand === hand && activeFinger === fingerNumber;

      return svgEl(
        'g',
        {
          class: active ? 'hand__digit hand__digit--active' : 'hand__digit',
          'data-finger-number': String(fingerNumber)
        },
        svgEl('path', {
          class: active ? 'hand__finger hand__finger--active' : 'hand__finger',
          d: area.d,
          transform: area.transform
        }),
        svgEl(
          'text',
          {
            class: active ? 'hand__number hand__number--active' : 'hand__number',
            x: label.x,
            y: label.y,
            'text-anchor': 'middle'
          },
          String(fingerNumber)
        )
      );
    })
  );
}

function renderNotice(message: string, tone: 'info' | 'warning' = 'info'): HTMLElement {
  return el('p', { className: `notice notice--${tone}` }, message);
}

function updateStatsForCorrectInput(preferences: StoredPreferences, trainer: AppState['trainer']): StoredPreferences {
  const now = Date.now();
  const lastInputAt = preferences.stats.lastInputAt;
  const activeDelta = lastInputAt !== null && now - lastInputAt <= activeInputPauseMs ? now - lastInputAt : 0;
  const targetChar = trainer.targetText[trainer.cursor] ?? '';
  const typedWords = isWordCompletedByChar(trainer.targetText, trainer.cursor)
    ? preferences.stats.typedWords + 1
    : preferences.stats.typedWords;

  return {
    ...preferences,
    stats: {
      activeMs: preferences.stats.activeMs + activeDelta,
      typedChars: preferences.stats.typedChars + (targetChar ? 1 : 0),
      typedWords,
      lastInputAt: now
    }
  };
}

function isWordCompletedByChar(text: string, index: number): boolean {
  const char = text[index] ?? '';
  const nextChar = text[index + 1] ?? '';

  return char.trim().length > 0 && nextChar.trim().length === 0;
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
  const customTextEnabled = isUsingCustomText(appState);
  const rawText = customTextEnabled ? appState.preferences.customTexts[layout.id] ?? '' : layout.defaultText;
  const normalized = customTextEnabled
    ? normalizeCustomTrainingText(rawText)
    : normalizeTrainingText(rawText, layout.inputLocale);

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
  return config.defaultKeyboardLayoutByLocale[appLocale] ?? config.defaultKeyboardLayout;
}

function sanitizeSelection(config: TrainerConfig, selection: TrainingSelection): TrainingSelection {
  const appLocale = isAppLocale(selection.appLocale) ? selection.appLocale : config.defaultAppLocale;
  const layout =
    config.keyboardLayouts.find((item) => item.id === selection.keyboardLayout) ??
    config.keyboardLayouts.find((item) => item.id === config.defaultKeyboardLayout) ??
    config.keyboardLayouts[0];

  return {
    appLocale,
    keyboardLayout: layout.id
  };
}

function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && value in appCopy;
}

type ExtraLabelKey =
  | 'keyboardAlt'
  | 'shareTitle'
  | 'shareText'
  | 'statsTitle'
  | 'activeTime'
  | 'typedChars'
  | 'typedWords'
  | 'speed'
  | 'errorReviewTitle'
  | 'spaceChar'
  | 'themeLabel'
  | 'themeDay'
  | 'themeNight';

const extraLabels: Record<ExtraLabelKey, LocalizedText> = {
  keyboardAlt: {
    ru: 'Схема клавиатуры и рук для слепой печати',
    en: 'Keyboard and hands diagram for touch typing',
    es: 'Diagrama de teclado y manos para mecanografía',
    pt: 'Diagrama de teclado e mãos para digitação',
    fr: 'Schéma du clavier et des mains pour la dactylographie',
    de: 'Tastatur- und Händediagramm für Blindschreiben',
    it: 'Schema di tastiera e mani per dattilografia',
    pl: 'Schemat klawiatury i dłoni do pisania bezwzrokowego',
    uk: 'Схема клавіатури й рук для сліпого друку',
    tr: 'Bakmadan yazma için klavye ve el şeması',
    nl: 'Schema van toetsenbord en handen voor blind typen',
    cs: 'Schéma klávesnice a rukou pro psaní poslepu',
    sk: 'Schéma klávesnice a rúk pre písanie naslepo'
  },
  shareTitle: {
    ru: 'Поделиться',
    en: 'Share',
    es: 'Compartir',
    pt: 'Compartilhar',
    fr: 'Partager',
    de: 'Teilen',
    it: 'Condividi',
    pl: 'Udostępnij',
    uk: 'Поділитися',
    tr: 'Paylaş',
    nl: 'Delen',
    cs: 'Sdílet',
    sk: 'Zdieľať'
  },
  shareText: {
    ru: 'MatrixType: тренажер слепой печати через телесные команды',
    en: 'MatrixType: blind typing through body commands',
    es: 'MatrixType: mecanografía a ciegas con comandos corporales',
    pt: 'MatrixType: digitação às cegas com comandos corporais',
    fr: 'MatrixType: dactylographie à l’aveugle avec commandes corporelles',
    de: 'MatrixType: Blindschreiben mit Körperkommandos',
    it: 'MatrixType: dattilografia alla cieca con comandi corporei',
    pl: 'MatrixType: pisanie bezwzrokowe przez komendy ciała',
    uk: 'MatrixType: сліпий друк через тілесні команди',
    tr: 'MatrixType: beden komutlarıyla bakmadan yazma',
    nl: 'MatrixType: blind typen met lichaamscommando’s',
    cs: 'MatrixType: psaní poslepu pomocí tělesných povelů',
    sk: 'MatrixType: písanie naslepo pomocou telesných povelov'
  },
  statsTitle: {
    ru: 'Статистика тренировки',
    en: 'Training stats',
    es: 'Estadísticas',
    pt: 'Estatísticas',
    fr: 'Statistiques',
    de: 'Statistik',
    it: 'Statistiche',
    pl: 'Statystyki',
    uk: 'Статистика',
    tr: 'İstatistikler',
    nl: 'Statistieken',
    cs: 'Statistiky',
    sk: 'Štatistiky'
  },
  activeTime: {
    ru: 'Время',
    en: 'Time',
    es: 'Tiempo',
    pt: 'Tempo',
    fr: 'Temps',
    de: 'Zeit',
    it: 'Tempo',
    pl: 'Czas',
    uk: 'Час',
    tr: 'Süre',
    nl: 'Tijd',
    cs: 'Čas',
    sk: 'Čas'
  },
  typedChars: {
    ru: 'Символы',
    en: 'Chars',
    es: 'Caracteres',
    pt: 'Caracteres',
    fr: 'Caractères',
    de: 'Zeichen',
    it: 'Caratteri',
    pl: 'Znaki',
    uk: 'Символи',
    tr: 'Karakter',
    nl: 'Tekens',
    cs: 'Znaky',
    sk: 'Znaky'
  },
  typedWords: {
    ru: 'Слова',
    en: 'Words',
    es: 'Palabras',
    pt: 'Palavras',
    fr: 'Mots',
    de: 'Wörter',
    it: 'Parole',
    pl: 'Słowa',
    uk: 'Слова',
    tr: 'Kelimeler',
    nl: 'Woorden',
    cs: 'Slova',
    sk: 'Slová'
  },
  speed: {
    ru: 'Скорость',
    en: 'Speed',
    es: 'Velocidad',
    pt: 'Velocidade',
    fr: 'Vitesse',
    de: 'Tempo',
    it: 'Velocità',
    pl: 'Szybkość',
    uk: 'Швидкість',
    tr: 'Hız',
    nl: 'Snelheid',
    cs: 'Rychlost',
    sk: 'Rýchlosť'
  },
  errorReviewTitle: {
    ru: 'Чаще ошибались',
    en: 'Most missed',
    es: 'Más fallos',
    pt: 'Mais erros',
    fr: 'Erreurs fréquentes',
    de: 'Häufige Fehler',
    it: 'Errori frequenti',
    pl: 'Najczęstsze błędy',
    uk: 'Найчастіші помилки',
    tr: 'En çok hata',
    nl: 'Meeste fouten',
    cs: 'Nejčastější chyby',
    sk: 'Najčastejšie chyby'
  },
  spaceChar: {
    ru: 'пробел',
    en: 'space',
    es: 'espacio',
    pt: 'espaço',
    fr: 'espace',
    de: 'Leertaste',
    it: 'spazio',
    pl: 'spacja',
    uk: 'пробіл',
    tr: 'boşluk',
    nl: 'spatie',
    cs: 'mezera',
    sk: 'medzera'
  },
  themeLabel: {
    ru: 'Стиль',
    en: 'Style',
    es: 'Estilo',
    pt: 'Estilo',
    fr: 'Style',
    de: 'Stil',
    it: 'Stile',
    pl: 'Styl',
    uk: 'Стиль',
    tr: 'Stil',
    nl: 'Stijl',
    cs: 'Styl',
    sk: 'Štýl'
  },
  themeDay: {
    ru: 'День',
    en: 'Day',
    es: 'Día',
    pt: 'Dia',
    fr: 'Jour',
    de: 'Tag',
    it: 'Giorno',
    pl: 'Dzień',
    uk: 'День',
    tr: 'Gündüz',
    nl: 'Dag',
    cs: 'Den',
    sk: 'Deň'
  },
  themeNight: {
    ru: 'Ночь',
    en: 'Night',
    es: 'Noche',
    pt: 'Noite',
    fr: 'Nuit',
    de: 'Nacht',
    it: 'Notte',
    pl: 'Noc',
    uk: 'Ніч',
    tr: 'Gece',
    nl: 'Nacht',
    cs: 'Noc',
    sk: 'Noc'
  }
};

function extraLabel(key: ExtraLabelKey): string {
  return localizedText(extraLabels[key], state.preferences.selection.appLocale);
}

function localeLabel(locale: AppLocale): string {
  const labels: Record<AppLocale, string> = {
    ru: 'Русский',
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pl: 'Polski',
    uk: 'Українська',
    tr: 'Türkçe',
    nl: 'Nederlands',
    cs: 'Čeština',
    sk: 'Slovenčina'
  };

  return labels[locale];
}

function parseTheme(value: string): VisualTheme {
  return value === 'night' ? 'night' : 'day';
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat(state.preferences.selection.appLocale).format(value);
}

function localizedText(text: LocalizedText, locale: AppLocale): string {
  return text[locale] ?? text.en;
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

render();
