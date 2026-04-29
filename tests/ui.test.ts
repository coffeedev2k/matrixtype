// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';

describe('app UI', () => {
  it('renders the three app screens without a render crash', async () => {
    await bootApp('ru-RU');

    expect(document.body.textContent).toContain('Учимся слепой печати, как в Матрице');
    expect(document.body.textContent).toContain('Нумерация пальцев');
    expect(document.body.textContent).toContain('На левой руке слева направо: 4, 3, 2, 1.');
    expect(document.querySelector('.reference-figure img')?.getAttribute('src')).toContain(
      'keyboard-hands-reference.png'
    );
    expect(document.querySelector('.share-links')?.textContent).toContain('Telegram');
    expect(document.body.textContent).not.toContain('MatrixType V1');

    clickButton('Свой текст');
    expect(document.body.textContent).toContain('Свой тренировочный текст');
    expect(document.querySelector('.settings-form')).toBeTruthy();
    expect(document.querySelector<HTMLSelectElement>('#visual-theme')).toBeTruthy();

    clickButton('Назад');
    clickButton('Начать');
    expect(document.querySelector('.command-banner')?.textContent).toContain('Произнесите команду');
    expect(document.querySelector('.stats-grid')?.textContent).toContain('Время');
    expect(document.querySelector('.hands-guide')).toBeTruthy();
    expect(document.querySelector('.hands-guide__image')?.getAttribute('href')).toContain(
      'hands-from-refs-numbered-v3.svg'
    );
    expect(document.body.textContent).toContain('Как тренироваться');
    expect(document.body.textContent).toContain('Не смотрите на клавиатуру.');
  });

  it('highlights the active hand palm and only the active numbered finger', async () => {
    await bootApp('ru-RU');

    clickButton('Начать');

    expect(document.querySelectorAll('.hand__palm--active')).toHaveLength(1);
    expect(document.querySelectorAll('.hand__finger--active')).toHaveLength(1);
    expect(document.querySelector('.hand__number--active')?.textContent).toBe('1');
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

function fingerNumbersForHand(hand: 'left' | 'right'): string[] {
  return Array.from(document.querySelectorAll(`[data-hand="${hand}"] [data-finger-number]`)).map(
    (item) => item.getAttribute('data-finger-number') ?? ''
  );
}
