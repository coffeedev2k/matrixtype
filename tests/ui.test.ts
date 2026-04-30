// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';
import { createAllLayoutCorpora } from './layoutCorpus';

describe('app UI', () => {
  it('renders the three app screens without a render crash', async () => {
    await bootApp('ru-RU');

    expect(document.body.textContent).toContain('Учимся слепой печати, как в Матрице');
    expect(document.body.textContent).toContain('Нумерация пальцев');
    expect(document.body.textContent).toContain('На левой руке слева направо: 4, 3, 2, 1.');
    expect(document.querySelector<HTMLImageElement>('.keyboard-reference img')?.src).toContain('keyboard.png');
    expect(document.querySelector('.share-links')?.textContent).toContain('Telegram');
    expect(document.body.textContent).not.toContain('MatrixType V1');

    clickButton('Свой текст');
    expect(document.body.textContent).toContain('Свой тренировочный текст');
    expect(document.querySelector('.settings-form')).toBeTruthy();
    expect(document.querySelector<HTMLSelectElement>('#visual-theme')).toBeTruthy();
    expect(document.querySelector<HTMLAnchorElement>('.support-link')?.href).toBe('https://ko-fi.com/coffeedev2k');

    clickButton('Назад');
    clickButton('Начать');
    expect(document.querySelector('.command-banner')?.textContent).toContain('Произнесите команду');
    expect(document.querySelector('.input-capture')).toBeTruthy();
    expect(document.querySelector('.stats-grid')?.textContent).toContain('Время');
    expect(document.querySelector('.hands-guide')?.getAttribute('viewBox')).toBe('0 0 2790 1707');
    expect(document.querySelector('.hands-guide__background')).toBeTruthy();
    expect(document.querySelector('.hands-guide__image')?.getAttribute('href')).toContain('hands.svg');
    expect(document.body.textContent).toContain('Как тренироваться');
    expect(document.body.textContent).toContain('Не смотрите на клавиатуру.');
  });

  it('stores and applies the day/night theme setting', async () => {
    await bootApp('en-US');

    clickButton('Custom text');

    const themeSelect = document.querySelector<HTMLSelectElement>('#visual-theme');
    expect(themeSelect).toBeTruthy();
    expect(Array.from(themeSelect!.options).map((option) => option.value)).toEqual(['day', 'night']);

    themeSelect!.value = 'night';
    clickButton('Save');

    expect(document.querySelector('.app')?.className).toContain('app--theme-night');

    const saved = JSON.parse(window.localStorage.getItem('matrixtype.preferences.v1') ?? '{}') as {
      theme?: string;
    };
    expect(saved.theme).toBe('night');
  });

  it('highlights the active hand palm and only the active numbered finger', async () => {
    await bootApp('ru-RU');

    clickButton('Начать');

    expect(document.querySelectorAll('.hand__palm--active')).toHaveLength(1);
    expect(document.querySelectorAll('.hand__finger--active')).toHaveLength(1);
    expect(document.querySelectorAll('.hand__thumb')).toHaveLength(2);
    expect(document.querySelectorAll('.hand__thumb--active')).toHaveLength(0);
    expect(document.querySelector('.hand__number--active')?.textContent).toBe('1');
  });

  it('highlights the visual finger slot that matches the spoken command number', async () => {
    await bootApp('en-US');

    clickButton('Custom text');
    setCustomText('ts');
    clickButton('Save');

    expect(document.querySelector('.command-banner')?.textContent).toContain('left, 1st, up right');
    expect(activeFingerVisualSlot('left')).toEqual({ fingerNumber: '1', slot: 3 });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }));

    expect(document.querySelector('.command-banner')?.textContent).toContain('left, 3rd, in place');
    expect(activeFingerVisualSlot('left')).toEqual({ fingerNumber: '3', slot: 1 });
  });

  it('highlights both visual thumbs for space without activating palms or numbered fingers', async () => {
    await bootApp('en-US');

    clickButton('Custom text');
    setCustomText('a a');
    clickButton('Save');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(document.querySelector('.command-banner__char')?.textContent).toBe('space');
    expect(document.querySelectorAll('.hand__thumb--active')).toHaveLength(2);
    expect(document.querySelectorAll('.hand__palm--active')).toHaveLength(0);
    expect(document.querySelectorAll('.hand__finger--active')).toHaveLength(0);
    expect(document.querySelectorAll('.hand__number--active')).toHaveLength(0);
  });

  it('renders hand finger numbers in the same order as the reference image', async () => {
    await bootApp('ru-RU');

    clickButton('Начать');

    expect(fingerNumbersForHand('left')).toEqual(['4', '3', '2', '1']);
    expect(fingerNumbersForHand('right')).toEqual(['1', '2', '3', '4']);
  });

  it('uses the browser language for the first welcome screen when supported', async () => {
    await bootApp('en-US');

    expect(document.documentElement.lang).toBe('en');
    expect(document.body.textContent).toContain('Blind typing through body commands');
    expect(document.body.textContent).toContain('English QWERTY');
    expect(document.body.textContent).not.toContain('Слепая печать через телесные команды');
  });

  it('uses Spanish browser language and Spanish keyboard by default when supported', async () => {
    await bootApp('es-ES');

    expect(document.documentElement.lang).toBe('es');
    expect(document.body.textContent).toContain('Mecanografía a ciegas con comandos corporales');
    expect(document.body.textContent).toContain('QWERTY española Latinoamérica');
  });

  it('uses added browser interface languages and their default keyboards', async () => {
    await bootApp('de-DE');

    expect(document.documentElement.lang).toBe('de');
    expect(document.body.textContent).toContain('Blindschreiben mit Körperkommandos');
    expect(document.body.textContent).toContain('German QWERTZ Germany');
  });

  it('renders the full keyboard layout selector and switches representative layouts', async () => {
    await bootApp('en-US');

    const layoutSelect = document.querySelector<HTMLSelectElement>('#keyboard-layout');
    expect(layoutSelect).toBeTruthy();
    expect(Array.from(layoutSelect!.options).map((option) => option.value)).toEqual(
      expect.arrayContaining(['pt-br-abnt2', 'fr-fr-azerty', 'de-de-qwertz', 'uk-ua-jcuken', 'tr-tr-f'])
    );

    layoutSelect!.value = 'fr-fr-azerty';
    layoutSelect!.dispatchEvent(new Event('change'));

    expect(document.body.textContent).toContain('French AZERTY France');
    expect(document.body.textContent).toContain('un matin calme');
  });

  it('changes welcome copy dynamically when the interface language changes', async () => {
    await bootApp('en-US');

    expect(document.body.textContent).toContain('Blind typing through body commands');

    const localeSelect = document.querySelector<HTMLSelectElement>('#app-locale');
    expect(localeSelect).toBeTruthy();

    localeSelect!.value = 'ru';
    localeSelect!.dispatchEvent(new Event('change'));

    expect(document.documentElement.lang).toBe('ru');
    expect(document.body.textContent).toContain('Учимся слепой печати, как в Матрице');
    expect(document.body.textContent).not.toContain('Blind typing through body commands');
  });

  it('supports uppercase custom text through Shift-derived commands', async () => {
    await bootApp('en-US');

    clickButton('Custom text');

    const textarea = document.querySelector<HTMLTextAreaElement>('.text-editor');
    const checkbox = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
    expect(textarea).toBeTruthy();
    expect(checkbox).toBeTruthy();

    textarea!.value = 'S';
    checkbox!.checked = true;
    clickButton('Save');

    expect(document.querySelector('.command-banner')?.textContent).toContain('with Shift');
    expect(document.querySelector('.command-banner')?.textContent).toContain('S');
    expect(document.body.textContent).not.toContain('unsupported character');
  });

  it('supports Spanish dead-key characters through text input events', async () => {
    await bootApp('es-ES');

    clickButton('Texto propio');

    const textarea = document.querySelector<HTMLTextAreaElement>('.text-editor');
    const checkbox = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
    textarea!.value = 'á';
    checkbox!.checked = true;
    clickButton('Guardar');

    expect(document.querySelector('.command-banner')?.textContent).toContain('primero');
    expect(document.querySelector('.command-banner')?.textContent).toContain('á');
    expect(document.body.textContent).not.toContain('símbolo no compatible');

    const input = document.querySelector<HTMLTextAreaElement>('.input-capture');
    expect(input).toBeTruthy();

    input!.value = 'á';
    input!.dispatchEvent(new InputEvent('input', { data: 'á', inputType: 'insertText', bubbles: true }));

    expect(document.querySelector('.command-banner')?.textContent).toContain('listo');
  });

  it('stores active typing stats and shows an error review', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    await bootApp('en-US');

    clickButton('Custom text');
    const textarea = document.querySelector<HTMLTextAreaElement>('.text-editor');
    const checkbox = document.querySelector<HTMLInputElement>('input[type="checkbox"]');
    textarea!.value = 'as';
    checkbox!.checked = true;
    clickButton('Save');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    vi.setSystemTime(2500);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));

    expect(document.querySelector('.stats-grid')?.textContent).toContain('Chars1');
    expect(document.querySelector('.error-review')?.textContent).toContain('s1');

    const saved = JSON.parse(window.localStorage.getItem('matrixtype.preferences.v1') ?? '{}') as {
      stats?: { typedChars?: number; activeMs?: number };
    };

    expect(saved.stats?.typedChars).toBe(1);
    expect(saved.stats?.activeMs).toBe(0);

    vi.useRealTimers();
  });

  it('completes generated symbol corpus for every keyboard layout through the custom text flow', async () => {
    await bootApp('en-US');

    for (const corpus of createAllLayoutCorpora()) {
      selectLayout(corpus.layout.id);
      openSettingsFromWelcome();
      setCustomText(corpus.text);
      clickButton('Save');

      expect(document.body.textContent).not.toContain('unsupported character');

      typeTextThroughCapture(corpus.text);

      expect(document.querySelector('.command-banner')?.textContent, corpus.layout.id).toContain('done');

      clickButton('Back');
    }
  }, 30000);

  it('completes Spanish and Polish sample texts with compound symbols', async () => {
    await bootApp('en-US');

    selectLayout('es-latam-qwerty');
    openSettingsFromWelcome();
    setCustomText('mañana café pingüino');
    clickButton('Save');
    typeTextThroughCapture('mañana café pingüino');
    expect(document.querySelector('.command-banner')?.textContent).toContain('done');

    clickButton('Back');
    selectLayout('pl-pl-programmers');
    openSettingsFromWelcome();
    setCustomText('ciepły dzień');
    clickButton('Save');
    typeTextThroughCapture('ciepły dzień');
    expect(document.querySelector('.command-banner')?.textContent).toContain('done');
  });
});

async function bootApp(language = 'ru-RU'): Promise<void> {
  vi.resetModules();
  document.body.innerHTML = '<div id="app"></div>';
  window.localStorage.clear();
  setBrowserLanguage(language);
  await import('../src/main');
}

function setBrowserLanguage(language: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: language,
    configurable: true
  });
  Object.defineProperty(window.navigator, 'languages', {
    value: [language],
    configurable: true
  });
}

function clickButton(text: string): void {
  const button = Array.from(document.querySelectorAll('button')).find((item) => item.textContent === text);

  expect(button).toBeTruthy();
  button?.click();
}

function selectLayout(layoutId: string): void {
  const layoutSelect = document.querySelector<HTMLSelectElement>('#keyboard-layout');

  expect(layoutSelect).toBeTruthy();
  layoutSelect!.value = layoutId;
  layoutSelect!.dispatchEvent(new Event('change'));
}

function openSettingsFromWelcome(): void {
  clickButton('Custom text');
}

function setCustomText(text: string): void {
  const textarea = document.querySelector<HTMLTextAreaElement>('.text-editor');
  const checkbox = document.querySelector<HTMLInputElement>('input[type="checkbox"]');

  expect(textarea).toBeTruthy();
  expect(checkbox).toBeTruthy();

  textarea!.value = text;
  checkbox!.checked = true;
}

function typeTextThroughCapture(text: string): void {
  for (const char of text) {
    const input = document.querySelector<HTMLTextAreaElement>('.input-capture');

    expect(input, `Missing input capture for ${char}`).toBeTruthy();
    input!.value = char;
    input!.dispatchEvent(new InputEvent('input', { data: char, inputType: 'insertText', bubbles: true }));
  }
}

function fingerNumbersForHand(hand: 'left' | 'right'): string[] {
  return Array.from(document.querySelectorAll(`[data-hand="${hand}"] [data-finger-number]`)).map(
    (item) => item.getAttribute('data-finger-number') ?? ''
  );
}

function activeFingerVisualSlot(hand: 'left' | 'right'): { fingerNumber: string; slot: number } | null {
  const slots = Array.from(document.querySelectorAll<SVGGElement>(`[data-hand="${hand}"] .hand__digit`))
    .map((digit) => {
      const path = digit.querySelector<SVGPathElement>('.hand__finger');
      const bounds = path ? pathBounds(path.getAttribute('d') ?? '') : null;

      return {
        digit,
        centerX: bounds ? (bounds.minX + bounds.maxX) / 2 : Number.NaN
      };
    })
    .sort((left, right) => left.centerX - right.centerX);
  const activeSlot = slots.findIndex((slot) => slot.digit.classList.contains('hand__digit--active'));

  if (activeSlot === -1) {
    return null;
  }

  return {
    fingerNumber: slots[activeSlot].digit.getAttribute('data-finger-number') ?? '',
    slot: activeSlot
  };
}

function pathBounds(d: string): { minX: number; maxX: number } {
  const numbers = Array.from(d.matchAll(/-?\d+(?:\.\d+)?/g)).map((match) => Number(match[0]));
  const xs: number[] = [];

  for (let index = 0; index < numbers.length - 1; index += 2) {
    xs.push(numbers[index]);
  }

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs)
  };
}
