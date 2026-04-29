import { trainerConfig } from '../src/data/config';
import type { KeyboardLayout, KeyboardLayoutId } from '../src/types';

const standaloneInputs = new Set(['Shift', 'Dead', 'AltGraph', 'Compose']);

export interface LayoutCorpus {
  layout: KeyboardLayout;
  text: string;
  chars: string[];
}

export function createLayoutCorpus(layout: KeyboardLayout): LayoutCorpus {
  const commands = layout.commandsByLocale.en.commands;
  const deadKeySources = new Set(
    Object.values(commands)
      .map((command) => command.deadKeyChar)
      .filter((char): char is string => Boolean(char))
  );
  const chars = Object.keys(commands).filter(
    (char) => char !== ' ' && !standaloneInputs.has(char) && !deadKeySources.has(char)
  );

  return {
    layout,
    chars,
    text: chars.join('')
  };
}

export function createAllLayoutCorpora(): LayoutCorpus[] {
  return trainerConfig.keyboardLayouts.map(createLayoutCorpus);
}

export function getLayoutCorpus(layoutId: KeyboardLayoutId): LayoutCorpus {
  const layout = trainerConfig.keyboardLayouts.find((item) => item.id === layoutId);

  if (!layout) {
    throw new Error(`Layout ${layoutId} was not found`);
  }

  return createLayoutCorpus(layout);
}
