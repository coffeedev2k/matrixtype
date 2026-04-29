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
import { appLocales } from '../src/types';
import type { KeyCommandMap } from '../src/types';
import { createAllLayoutCorpora, getLayoutCorpus } from './layoutCorpus';

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

  it('ignores standalone Dead and AltGraph without counting an error', () => {
    const state = createTrainerState('А');
    const deadResult = applyInput(state, commandMap, 'Dead');
    const altGrResult = applyInput(state, commandMap, 'AltGraph');

    expect(deadResult.outcome).toBe('ignored');
    expect(deadResult.state.errorCount).toBe(0);
    expect(altGrResult.outcome).toBe('ignored');
    expect(altGrResult.state.errorCount).toBe(0);
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

  it('adds Spanish interface commands for existing English keyboard layouts', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'en-us-qwerty');
    const command = layout?.commandsByLocale.es.commands.s;

    expect(command).toMatchObject({
      spokenCommand: 'izquierda, 3.º, en sitio',
      hand: 'left',
      fingerNumber: 3,
      position: 'en sitio'
    });
  });

  it('supports Latin American Spanish direct ñ key', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'es-latam-qwerty');
    const command = layout?.commandsByLocale.es.commands['ñ'];

    expect(command).toMatchObject({
      spokenCommand: 'derecha, 4.º, en sitio',
      hand: 'right',
      fingerNumber: 4,
      position: 'en sitio'
    });
  });

  it('derives Spanish uppercase Ñ from lowercase ñ', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'es-es-qwerty');
    const command = layout?.commandsByLocale.es.commands['Ñ'];

    expect(command).toMatchObject({
      spokenCommand: 'derecha, 4.º, en sitio, con Shift',
      hand: 'right',
      fingerNumber: 4,
      position: 'en sitio',
      baseChar: 'ñ',
      requiresShift: true
    });
  });

  it('adds Spanish acute dead-key commands', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'es-latam-qwerty');
    const command = layout?.commandsByLocale.ru.commands['á'];

    expect(command).toMatchObject({
      inputKind: 'deadKey',
      baseChar: 'a',
      deadKeyChar: '´',
      hand: 'left',
      fingerNumber: 4
    });
    expect(command?.spokenCommand).toContain('сначала правой, 4-м, вверх вправо');
    expect(command?.spokenCommand).toContain('затем левой, 4-м, на месте');
  });

  it('advances Spanish dead-key output only on exact composed character', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'es-latam-qwerty');
    const commandMap = layout!.commandsByLocale.es;
    const correctResult = applyInput(createTrainerState('á'), commandMap, 'á');
    const wrongResult = applyInput(createTrainerState('á'), commandMap, 'a');

    expect(correctResult.outcome).toBe('complete');
    expect(correctResult.state.typedText).toBe('á');
    expect(wrongResult.outcome).toBe('incorrect');
    expect(wrongResult.state.cursor).toBe(0);
  });

  it('adds Polish AltGr commands over programmer layout', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'pl-pl-programmers');
    const command = layout?.commandsByLocale.en.commands['ł'];

    expect(command).toMatchObject({
      inputKind: 'altGr',
      baseChar: 'l',
      requiresAltGr: true,
      hand: 'right',
      fingerNumber: 3
    });
    expect(command?.spokenCommand).toContain('with AltGr');
  });

  it('keeps Spain and Latin American Spanish keyboard layouts separate', () => {
    expect(trainerConfig.keyboardLayouts.map((layout) => layout.id)).toEqual(
      expect.arrayContaining(['es-es-qwerty', 'es-latam-qwerty'])
    );
  });

  it('registers all planned keyboard-first training layouts', () => {
    expect(trainerConfig.keyboardLayouts.map((layout) => layout.id)).toEqual([
      'ru-qwerty',
      'en-us-qwerty',
      'es-latam-qwerty',
      'es-es-qwerty',
      'pt-br-abnt2',
      'pt-pt-qwerty',
      'fr-fr-azerty',
      'de-de-qwertz',
      'it-it-qwerty',
      'pl-pl-programmers',
      'uk-ua-jcuken',
      'tr-tr-qwerty',
      'tr-tr-f',
      'nl-us-intl',
      'cs-cz-qwertz',
      'sk-sk-qwertz'
    ]);
  });

  it('keeps every registered layout complete for supported interface languages', () => {
    for (const layout of trainerConfig.keyboardLayouts) {
      expect(layout.defaultText.length).toBeGreaterThan(0);

      for (const locale of appLocales) {
        expect(layout.label[locale] ?? layout.label.en).toBeTruthy();
        expect(layout.note[locale] ?? layout.note.en).toBeTruthy();
        expect(layout.commandsByLocale[locale].commands[' ']).toBeTruthy();
      }
    }
  });

  it('keeps default texts limited to supported direct characters', () => {
    for (const layout of trainerConfig.keyboardLayouts) {
      const commandMap = layout.commandsByLocale.en.commands;

      for (const char of layout.defaultText) {
        expect(commandMap[char], `${layout.id} is missing ${char}`).toBeTruthy();
      }
    }
  });

  it('generates supported integration corpus for every layout', () => {
    for (const corpus of createAllLayoutCorpora()) {
      const commandMap = corpus.layout.commandsByLocale.en.commands;

      expect(corpus.chars.length, corpus.layout.id).toBeGreaterThan(0);
      expect(corpus.text.length, corpus.layout.id).toBeGreaterThan(0);

      for (const char of corpus.text) {
        expect(commandMap[char], `${corpus.layout.id} is missing ${char}`).toBeTruthy();
      }
    }
  });

  it('includes compound and shifted symbols in generated corpora', () => {
    const spanishCorpus = getLayoutCorpus('es-latam-qwerty');
    const polishCorpus = getLayoutCorpus('pl-pl-programmers');
    const englishCorpus = getLayoutCorpus('en-us-qwerty');

    for (const char of 'áéíóúüñ') {
      expect(spanishCorpus.chars, `Spanish corpus is missing ${char}`).toContain(char);
    }

    for (const char of 'ąćęłńóśźż') {
      expect(polishCorpus.chars, `Polish corpus is missing ${char}`).toContain(char);
    }

    expect(englishCorpus.chars).toContain('A');
  });

  it('checks representative keys for new layout packs', () => {
    const cases = [
      ['pt-br-abnt2', 'ç', 'right', 4],
      ['pt-pt-qwerty', 'ç', 'right', 4],
      ['fr-fr-azerty', 'a', 'left', 4],
      ['de-de-qwertz', 'z', 'right', 1],
      ['it-it-qwerty', 'a', 'left', 4],
      ['pl-pl-programmers', 'a', 'left', 4],
      ['uk-ua-jcuken', 'і', 'left', 3],
      ['tr-tr-qwerty', 'ı', 'right', 2],
      ['tr-tr-f', 'f', 'left', 4],
      ['nl-us-intl', 'a', 'left', 4],
      ['cs-cz-qwertz', 'z', 'right', 1],
      ['sk-sk-qwertz', 'z', 'right', 1]
    ] as const;

    for (const [layoutId, char, hand, fingerNumber] of cases) {
      const layout = trainerConfig.keyboardLayouts.find((item) => item.id === layoutId);
      expect(layout?.commandsByLocale.en.commands[char]).toMatchObject({
        hand,
        fingerNumber
      });
    }
  });

  it('derives uppercase direct letters in new layout packs', () => {
    const layout = trainerConfig.keyboardLayouts.find((item) => item.id === 'tr-tr-qwerty');
    const command = layout?.commandsByLocale.en.commands['İ'];

    expect(command).toMatchObject({
      baseChar: 'i',
      requiresShift: true,
      hand: 'right',
      fingerNumber: 4
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
      'src/data/layouts/enUsQwerty.ts',
      'src/data/layouts/spanishQwerty.ts',
      'src/data/layouts/additionalLayouts.ts',
      'src/data/layouts/shared.ts'
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
