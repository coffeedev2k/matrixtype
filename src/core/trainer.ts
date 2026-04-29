import type { KeyCommandMap } from '../types';

export type TrainerOutcome = 'correct' | 'incorrect' | 'ignored' | 'complete';

export interface TrainerState {
  targetText: string;
  cursor: number;
  typedText: string;
  errorCount: number;
  errorsByChar: Record<string, number>;
}

export interface CurrentCue {
  char: string;
  command: KeyCommandMap['commands'][string] | null;
  supported: boolean;
}

export interface InputResult {
  state: TrainerState;
  outcome: TrainerOutcome;
}

export function normalizeTrainingText(text: string, locale = 'ru-RU'): string {
  return text.replace(/\s+/g, ' ').trim().toLocaleLowerCase(locale);
}

export function normalizeCustomTrainingText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function createTrainerState(targetText: string): TrainerState {
  return {
    targetText,
    cursor: 0,
    typedText: '',
    errorCount: 0,
    errorsByChar: {}
  };
}

export function isComplete(state: TrainerState): boolean {
  return state.cursor >= state.targetText.length;
}

export function getCurrentCue(state: TrainerState, commandMap: KeyCommandMap): CurrentCue | null {
  if (isComplete(state)) {
    return null;
  }

  const char = state.targetText[state.cursor] ?? '';
  const command = commandMap.commands[char] ?? null;

  return {
    char,
    command,
    supported: command !== null
  };
}

export function applyInput(
  state: TrainerState,
  commandMap: KeyCommandMap,
  rawInput: string
): InputResult {
  if (isComplete(state)) {
    return { state, outcome: 'complete' };
  }

  if (!isPrintableInput(rawInput)) {
    return { state, outcome: 'ignored' };
  }

  const cue = getCurrentCue(state, commandMap);

  if (!cue?.supported) {
    const char = cue?.char ?? '';

    return {
      state: {
        ...state,
        errorCount: state.errorCount + 1,
        errorsByChar: addCharError(state.errorsByChar, char)
      },
      outcome: 'incorrect'
    };
  }

  if (rawInput !== cue.char) {
    return {
      state: {
        ...state,
        errorCount: state.errorCount + 1,
        errorsByChar: addCharError(state.errorsByChar, cue.char)
      },
      outcome: 'incorrect'
    };
  }

  const cursor = state.cursor + 1;
  const typedText = state.typedText + cue.char;

  return {
    state: {
      ...state,
      cursor,
      typedText
    },
    outcome: cursor >= state.targetText.length ? 'complete' : 'correct'
  };
}

function isPrintableInput(input: string): boolean {
  return input.length === 1;
}

function addCharError(errorsByChar: Record<string, number>, char: string): Record<string, number> {
  return {
    ...errorsByChar,
    [char]: (errorsByChar[char] ?? 0) + 1
  };
}
