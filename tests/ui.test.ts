// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

describe('app UI', () => {
  it('opens the trainer after the start button without a render crash', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    window.localStorage.clear();

    await import('../src/main');

    expect(document.body.textContent).not.toContain('MatrixType V1');

    const startButton = Array.from(document.querySelectorAll('button')).find(
      (button) => button.textContent === 'Начать'
    );

    expect(startButton).toBeTruthy();
    startButton?.click();

    expect(document.querySelector('.command-banner')?.textContent).toContain('Произнесите команду');
    expect(document.querySelector('.hands-guide')).toBeTruthy();
    expect(document.body.textContent).not.toContain('MatrixType V1');
  });
});
