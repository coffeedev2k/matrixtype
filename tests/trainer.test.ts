import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  applyInput,
  createTrainerState,
  getCurrentCue,
  normalizeCustomTrainingText,
  normalizeTrainingText
} from '../src/core/trainer';
import { trainerConfig } from '../src/data/config';
import type { KeyCommandMap } from '../src/types';

const commandMap: KeyCommandMap = {
  id: 'test',
  keyboardLayout: 'ru-qwerty',
  appLocale: 'ru',
  inputLocale: 'ru-RU',
  commands: {
    а: {
      spokenCommand: 'левая рука',
      hand: 'left',
      fingerNumber: 1,
      position: 'на месте'
    },
    А: {
      spokenCommand: 'левая рука, с Shift',
      hand: 'left',
      fingerNumber: 1,
      position: 'на месте',
      baseChar: 'а',
      requiresShift: true
    },
    ' ': {
      spokenCommand: 'пробел'
    },
    '.': {
      spokenCommand: 'точка',
      hand: 'right',
      fingerNumber: 4,
      position: 'вниз'
    }
  }
};

describe('trainer core', () => {
  it('advances on correct input', () => {
    const state = createTrainerState('а.');
    const result = applyInput(state, commandMap, 'а');

    expect(result.outcome).toBe('correct');
    expect(result.state.cursor).toBe(1);
    expect(result.state.typedText).toBe('а');
  });

  it('does not advance on wrong input', () => {
    const state = createTrainerState('а.');
    const result = applyInput(state, commandMap, 'б');

    expect(result.outcome).toBe('incorrect');
    expect(result.state.cursor).toBe(0);
    expect(result.state.typedText).toBe('');
    expect(result.state.errorCount).toBe(1);
  });

  it('handles spaces', () => {
    const state = createTrainerState(' ');
    const result = applyInput(state, commandMap, ' ');

    expect(result.outcome).toBe('complete');
    expect(result.state.cursor).toBe(1);
    expect(result.state.typedText).toBe(' ');
  });

  it('handles punctuation', () => {
    const state = createTrainerState('.');
    const result = applyInput(state, commandMap, '.');

    expect(result.outcome).toBe('complete');
    expect(result.state.typedText).toBe('.');
  });

  it('advances uppercase only on exact uppercase input', () => {
    const state = createTrainerState('А');
    const result = applyInput(state, commandMap, 'А');

    expect(result.outcome).toBe('complete');
    expect(result.state.cursor).toBe(1);
    expect(result.state.typedText).toBe('А');
  });

  it('does not advance uppercase target on lowercase input', () => {
    const state = createTrainerState('А');
    const result = applyInput(state, commandMap, 'а');

    expect(result.outcome).toBe('incorrect');
    expect(result.state.cursor).toBe(0);
    expect(result.state.errorCount).toBe(1);
  });

  it('does not advance lowercase target on uppercase input', () => {
    const state = createTrainerState('а');
    const result = applyInput(state, commandMap, 'А');

    expect(result.outcome).toBe('incorrect');
    expect(result.state.cursor).toBe(0);
    expect(result.state.errorCount).toBe(1);
  });

  it('ignores standalone Shift without counting an error', () => {
    const state = createTrainerState('А');
    const result = applyInput(state, commandMap, 'Shift');

    expect(result.outcome).toBe('ignored');
    expect(result.state.cursor).toBe(0);
    expect(result.state.errorCount).toBe(0);
  });

  it('reports unsupported characters without crashing', () => {
    const state = createTrainerState('ж');
    const cue = getCurrentCue(state, commandMap);
    const result = applyInput(state, commandMap, 'ж');

    expect(cue).toEqual({
      char: 'ж',
      command: null,
      supported: false
    });
    expect(result.outcome).toBe('incorrect');
    expect(result.state.cursor).toBe(0);
  });

  it('normalizes default text to lower case before training', () => {
    expect(normalizeTrainingText('  РУКА   ПОМНИТ  КЛАВИШУ. ')).toBe('рука помнит клавишу.');
  });

  it('keeps custom text case while normalizing spacing', () => {
    expect(normalizeCustomTrainingText('  Hotel   California  TEST. ')).toBe('Hotel California TEST.');
  });

  it('keeps Russian commands tied to Russian interface over Russian keyboard', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'ru-qwerty');
    const command = layout?.commandsByLocale.ru.commands['а'];

    expect(command).toMatchObject({
      spokenCommand: 'левой, 1-м, на месте',
      hand: 'left',
      fingerNumber: 1,
      position: 'на месте'
    });
  });

  it('keeps English commands tied to English interface over Russian keyboard', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'ru-qwerty');
    const command = layout?.commandsByLocale.en.commands['а'];

    expect(command).toMatchObject({
      spokenCommand: 'left, 1st, in place',
      hand: 'left',
      fingerNumber: 1,
      position: 'in place'
    });
  });

  it('keeps Russian commands tied to Russian interface over English keyboard', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'en-us-qwerty');
    const command = layout?.commandsByLocale.ru.commands.a;

    expect(command).toMatchObject({
      spokenCommand: 'левой, 4-м, на месте',
      hand: 'left',
      fingerNumber: 4,
      position: 'на месте'
    });
  });

  it('keeps English commands tied to English interface over English keyboard', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'en-us-qwerty');
    const command = layout?.commandsByLocale.en.commands.a;

    expect(command).toMatchObject({
      spokenCommand: 'left, 4th, in place',
      hand: 'left',
      fingerNumber: 4,
      position: 'in place'
    });
  });

  it('derives English uppercase commands from lowercase base commands', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'en-us-qwerty');
    const command = layout?.commandsByLocale.ru.commands.S;

    expect(command).toMatchObject({
      spokenCommand: 'левой, 3-м, на месте, с Shift',
      hand: 'left',
      fingerNumber: 3,
      position: 'на месте',
      baseChar: 's',
      requiresShift: true
    });
  });

  it('derives Russian uppercase commands from lowercase base commands', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'ru-qwerty');
    const command = layout?.commandsByLocale.ru.commands['А'];

    expect(command).toMatchObject({
      spokenCommand: 'левой, 1-м, на месте, с Shift',
      hand: 'left',
      fingerNumber: 1,
      position: 'на месте',
      baseChar: 'а',
      requiresShift: true
    });
  });

  it('does not assign hand fields to spaces', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'en-us-qwerty');
    const command = layout?.commandsByLocale.en.commands[' '];

    expect(command?.spokenCommand).toBe('space');
    expect(command).not.toHaveProperty('hand');
    expect(command).not.toHaveProperty('fingerNumber');
  });

  it('keeps method data limited to approved hand and finger fields', () => {
    const checkedFiles = [
      'src/types.ts',
      'src/data/layouts/ruQwerty.ts',
      'src/data/layouts/enUsQwerty.ts'
    ];
    const forbiddenTerms = ['index', 'middle', 'ring', 'pinky', 'thumb', 'both', 'home'];
    const content = checkedFiles
      .map((file) => readFileSync(join(process.cwd(), file), 'utf8'))
      .join('\n');

    for (const term of forbiddenTerms) {
      expect(content).not.toMatch(new RegExp(`\\b${term}\\b`));
    }
  });
});
