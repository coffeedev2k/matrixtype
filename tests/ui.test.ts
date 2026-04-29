// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest';

describe('app UI', () => {
  it('renders the three app screens without a render crash', async () => {
    await bootApp('ru-RU');

    expect(document.body.textContent).toContain('Слепая печать через телесные команды');
    expect(document.body.textContent).toContain('Нумерация пальцев');
    expect(document.body.textContent).toContain('На левой руке слева направо: 4, 3, 2, 1.');
    expect(document.body.textContent).not.toContain('MatrixType V1');

    clickButton('Свой текст');
    expect(document.body.textContent).toContain('Свой тренировочный текст');
    expect(document.querySelector('.settings-form')).toBeTruthy();

    clickButton('Назад');
    clickButton('Начать');
    expect(document.querySelector('.command-banner')?.textContent).toContain('Произнесите команду');
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

  it('changes welcome copy dynamically when the interface language changes', async () => {
    await bootApp('en-US');

    expect(document.body.textContent).toContain('Blind typing through body commands');

    const localeSelect = document.querySelector<HTMLSelectElement>('#app-locale');
    expect(localeSelect).toBeTruthy();

    localeSelect!.value = 'ru';
    localeSelect!.dispatchEvent(new Event('change'));

    expect(document.documentElement.lang).toBe('ru');
    expect(document.body.textContent).toContain('Слепая печать через телесные команды');
    expect(document.body.textContent).not.toContain('Blind typing through body commands');
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
