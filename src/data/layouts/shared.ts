import { appLocales } from '../../types';
import type { AppLocale, Hand, KeyCommand, KeyCommandMap, KeyboardLayout, KeyboardLayoutId } from '../../types';

export type CommandTuple = [
  ru: string,
  en: string,
  hand?: Hand,
  fingerNumber?: 1 | 2 | 3 | 4,
  ruPosition?: string,
  enPosition?: string
];

interface CommandLocaleData {
  left: string;
  right: string;
  space: string;
  shift: string;
  finger: (fingerNumber: 1 | 2 | 3 | 4) => string;
  positions: Record<string, string>;
}

const commandLocaleData: Record<AppLocale, CommandLocaleData> = {
  ru: {
    left: 'левой',
    right: 'правой',
    space: 'пробел',
    shift: 'с Shift',
    finger: (fingerNumber) => `${fingerNumber}-м`,
    positions: {}
  },
  en: {
    left: 'left',
    right: 'right',
    space: 'space',
    shift: 'with Shift',
    finger: englishOrdinal,
    positions: {}
  },
  es: {
    left: 'izquierda',
    right: 'derecha',
    space: 'espacio',
    shift: 'con Shift',
    finger: (fingerNumber) => `${fingerNumber}.º`,
    positions: {
      up: 'arriba',
      'up right': 'arriba derecha',
      'far up right': 'muy arriba derecha',
      'up left': 'arriba izquierda',
      'far up left': 'muy arriba izquierda',
      'far right': 'muy derecha',
      'high up left': 'muy arriba izquierda',
      'high up center': 'muy arriba centro',
      'high up with shift': 'muy arriba con Shift',
      'high up left with shift': 'muy arriba izquierda con Shift',
      'in place': 'en sitio',
      'in place with shift': 'en sitio con Shift',
      right: 'derecha',
      'right with shift': 'derecha con Shift',
      left: 'izquierda',
      down: 'abajo',
      'down left': 'abajo izquierda',
      'down right': 'abajo derecha',
      'down right with shift': 'abajo derecha con Shift',
      'right, down': 'derecha, abajo'
    }
  },
  pt: {
    left: 'esquerda',
    right: 'direita',
    space: 'espaço',
    shift: 'com Shift',
    finger: (fingerNumber) => `${fingerNumber}.º`,
    positions: {
      up: 'para cima',
      'up right': 'para cima direita',
      'far up right': 'muito para cima direita',
      'up left': 'para cima esquerda',
      'far up left': 'muito para cima esquerda',
      'far right': 'muito direita',
      'in place': 'no lugar',
      right: 'direita',
      left: 'esquerda',
      down: 'para baixo',
      'down left': 'para baixo esquerda',
      'down right': 'para baixo direita',
      'right, down': 'direita, baixo'
    }
  },
  fr: {
    left: 'gauche',
    right: 'droite',
    space: 'espace',
    shift: 'avec Shift',
    finger: (fingerNumber) => `${fingerNumber}e`,
    positions: {
      up: 'haut',
      'up right': 'haut droite',
      'far up right': 'loin haut droite',
      'up left': 'haut gauche',
      'far up left': 'loin haut gauche',
      'far right': 'loin droite',
      'in place': 'sur place',
      right: 'droite',
      left: 'gauche',
      down: 'bas',
      'down left': 'bas gauche',
      'down right': 'bas droite',
      'right, down': 'droite, bas'
    }
  },
  de: {
    left: 'links',
    right: 'rechts',
    space: 'Leertaste',
    shift: 'mit Shift',
    finger: (fingerNumber) => `${fingerNumber}.`,
    positions: {
      up: 'oben',
      'up right': 'oben rechts',
      'far up right': 'weit oben rechts',
      'up left': 'oben links',
      'far up left': 'weit oben links',
      'far right': 'weit rechts',
      'in place': 'an Ort',
      right: 'rechts',
      left: 'links',
      down: 'unten',
      'down left': 'unten links',
      'down right': 'unten rechts',
      'right, down': 'rechts, unten'
    }
  },
  it: {
    left: 'sinistra',
    right: 'destra',
    space: 'spazio',
    shift: 'con Shift',
    finger: (fingerNumber) => `${fingerNumber}.º`,
    positions: {
      up: 'su',
      'up right': 'su destra',
      'far up right': 'molto su destra',
      'up left': 'su sinistra',
      'far up left': 'molto su sinistra',
      'far right': 'molto destra',
      'in place': 'sul posto',
      right: 'destra',
      left: 'sinistra',
      down: 'giu',
      'down left': 'giu sinistra',
      'down right': 'giu destra',
      'right, down': 'destra, giu'
    }
  },
  pl: {
    left: 'lewą',
    right: 'prawą',
    space: 'spacja',
    shift: 'z Shift',
    finger: (fingerNumber) => `${fingerNumber}.`,
    positions: {
      up: 'w górę',
      'up right': 'w górę prawo',
      'far up right': 'daleko w górę prawo',
      'up left': 'w górę lewo',
      'far up left': 'daleko w górę lewo',
      'far right': 'daleko prawo',
      'in place': 'na miejscu',
      right: 'prawo',
      left: 'lewo',
      down: 'w dół',
      'down left': 'w dół lewo',
      'down right': 'w dół prawo',
      'right, down': 'prawo, dół'
    }
  },
  uk: {
    left: 'лівою',
    right: 'правою',
    space: 'пробіл',
    shift: 'з Shift',
    finger: (fingerNumber) => `${fingerNumber}-м`,
    positions: {
      up: 'вгору',
      'up right': 'вгору праворуч',
      'far up right': 'далеко вгору праворуч',
      'up left': 'вгору ліворуч',
      'far up left': 'далеко вгору ліворуч',
      'far right': 'далеко праворуч',
      'in place': 'на місці',
      right: 'праворуч',
      left: 'ліворуч',
      down: 'вниз',
      'down left': 'вниз ліворуч',
      'down right': 'вниз праворуч',
      'right, down': 'праворуч, вниз'
    }
  },
  tr: {
    left: 'sol',
    right: 'sağ',
    space: 'boşluk',
    shift: 'Shift ile',
    finger: (fingerNumber) => `${fingerNumber}.`,
    positions: {
      up: 'yukarı',
      'up right': 'yukarı sağa',
      'far up right': 'uzak yukarı sağa',
      'up left': 'yukarı sola',
      'far up left': 'uzak yukarı sola',
      'far right': 'uzak sağa',
      'in place': 'yerinde',
      right: 'sağa',
      left: 'sola',
      down: 'aşağı',
      'down left': 'aşağı sola',
      'down right': 'aşağı sağa',
      'right, down': 'sağa, aşağı'
    }
  },
  nl: {
    left: 'links',
    right: 'rechts',
    space: 'spatie',
    shift: 'met Shift',
    finger: (fingerNumber) => `${fingerNumber}e`,
    positions: {
      up: 'omhoog',
      'up right': 'omhoog rechts',
      'far up right': 'ver omhoog rechts',
      'up left': 'omhoog links',
      'far up left': 'ver omhoog links',
      'far right': 'ver rechts',
      'in place': 'op zijn plek',
      right: 'rechts',
      left: 'links',
      down: 'omlaag',
      'down left': 'omlaag links',
      'down right': 'omlaag rechts',
      'right, down': 'rechts, omlaag'
    }
  },
  cs: {
    left: 'levou',
    right: 'pravou',
    space: 'mezerník',
    shift: 'se Shiftem',
    finger: (fingerNumber) => `${fingerNumber}.`,
    positions: {
      up: 'nahoru',
      'up right': 'nahoru doprava',
      'far up right': 'daleko nahoru doprava',
      'up left': 'nahoru doleva',
      'far up left': 'daleko nahoru doleva',
      'far right': 'daleko doprava',
      'in place': 'na místě',
      right: 'doprava',
      left: 'doleva',
      down: 'dolů',
      'down left': 'dolů doleva',
      'down right': 'dolů doprava',
      'right, down': 'doprava, dolů'
    }
  },
  sk: {
    left: 'ľavou',
    right: 'pravou',
    space: 'medzerník',
    shift: 'so Shiftom',
    finger: (fingerNumber) => `${fingerNumber}.`,
    positions: {
      up: 'hore',
      'up right': 'hore doprava',
      'far up right': 'ďaleko hore doprava',
      'up left': 'hore doľava',
      'far up left': 'ďaleko hore doľava',
      'far right': 'ďaleko doprava',
      'in place': 'na mieste',
      right: 'doprava',
      left: 'doľava',
      down: 'dole',
      'down left': 'dole doľava',
      'down right': 'dole doprava',
      'right, down': 'doprava, dole'
    }
  }
};

const keyPositions: Array<[Hand, 1 | 2 | 3 | 4, string, string]> = [
  ['left', 4, 'вверх', 'up'],
  ['left', 3, 'вверх', 'up'],
  ['left', 2, 'вверх', 'up'],
  ['left', 1, 'вверх', 'up'],
  ['left', 1, 'вверх направо', 'up right'],
  ['right', 1, 'вверх влево', 'up left'],
  ['right', 1, 'вверх', 'up'],
  ['right', 2, 'вверх', 'up'],
  ['right', 3, 'вверх', 'up'],
  ['right', 4, 'вверх', 'up'],
  ['right', 4, 'вверх вправо', 'up right'],
  ['right', 4, 'вверх далеко вправо', 'far up right'],

  ['left', 4, 'на месте', 'in place'],
  ['left', 3, 'на месте', 'in place'],
  ['left', 2, 'на месте', 'in place'],
  ['left', 1, 'на месте', 'in place'],
  ['left', 1, 'вправо', 'right'],
  ['right', 1, 'влево', 'left'],
  ['right', 1, 'на месте', 'in place'],
  ['right', 2, 'на месте', 'in place'],
  ['right', 3, 'на месте', 'in place'],
  ['right', 4, 'на месте', 'in place'],
  ['right', 4, 'вправо', 'right'],
  ['right', 4, 'далеко вправо', 'far right'],

  ['left', 4, 'вниз', 'down'],
  ['left', 3, 'вниз', 'down'],
  ['left', 2, 'вниз', 'down'],
  ['left', 1, 'вниз', 'down'],
  ['left', 1, 'вправо, вниз', 'right, down'],
  ['right', 1, 'вниз влево', 'down left'],
  ['right', 1, 'вниз', 'down'],
  ['right', 2, 'вниз', 'down'],
  ['right', 3, 'вниз', 'down'],
  ['right', 4, 'вниз', 'down']
];

export interface DirectKeyLayoutConfig {
  id: KeyboardLayoutId;
  inputLocale: string;
  label: KeyboardLayout['label'];
  note: KeyboardLayout['note'];
  defaultText: string;
  rows: string[];
  extraRows?: Record<string, CommandTuple>;
  shiftedChars?: Record<string, string>;
}

export function createCommandFromTuple(appLocale: AppLocale, tuple: CommandTuple): KeyCommand {
  const [ru, en, hand, fingerNumber, ruPosition, enPosition] = tuple;
  const position =
    appLocale === 'ru' ? ruPosition : appLocale === 'en' ? enPosition : translatePosition(appLocale, enPosition);
  const command: KeyCommand = {
    spokenCommand: createSpokenCommand(appLocale, tuple, position)
  };

  if (hand) {
    command.hand = hand;
  }

  if (fingerNumber) {
    command.fingerNumber = fingerNumber;
  }

  if (position) {
    command.position = position;
  }

  return command;
}

export function addShiftCommands(
  commands: Record<string, KeyCommand>,
  appLocale: AppLocale,
  shiftedChars: Record<string, string>
): void {
  const shiftSuffix = commandLocaleData[appLocale].shift;

  for (const [shiftedChar, baseChar] of Object.entries(shiftedChars)) {
    const baseCommand = commands[baseChar];

    if (!baseCommand) {
      continue;
    }

    commands[shiftedChar] = {
      ...baseCommand,
      spokenCommand: `${baseCommand.spokenCommand}, ${shiftSuffix}`,
      baseChar,
      requiresShift: true
    };
  }
}

export function createDirectKeyLayout(config: DirectKeyLayoutConfig): KeyboardLayout {
  const rows = {
    ...createRowsFromKeys(config.rows),
    ' ': ['пробел', 'space'] as CommandTuple,
    ...(config.extraRows ?? {})
  };
  const shiftedChars = config.shiftedChars ?? createShiftedChars(Object.keys(rows).join(''), config.inputLocale);

  return {
    id: config.id,
    label: config.label,
    note: config.note,
    inputLocale: config.inputLocale,
    defaultText: config.defaultText,
    commandsByLocale: createCommandMaps(config.id, config.inputLocale, rows, shiftedChars)
  };
}

export function createCommandMaps(
  keyboardLayout: KeyboardLayoutId,
  inputLocale: string,
  rows: Record<string, CommandTuple>,
  shiftedChars: Record<string, string>
): Record<AppLocale, KeyCommandMap> {
  return Object.fromEntries(
    appLocales.map((appLocale) => [
      appLocale,
      createCommandMap(keyboardLayout, inputLocale, appLocale, rows, shiftedChars)
    ])
  ) as Record<AppLocale, KeyCommandMap>;
}

export function createShiftedChars(chars: string, locale: string): Record<string, string> {
  const shifted: Record<string, string> = {};

  for (const char of chars) {
    const upper = char.toLocaleUpperCase(locale);

    if (char !== upper && upper.length === 1) {
      shifted[upper] = char;
    }
  }

  return shifted;
}

function createCommandMap(
  keyboardLayout: KeyboardLayoutId,
  inputLocale: string,
  appLocale: AppLocale,
  rows: Record<string, CommandTuple>,
  shiftedChars: Record<string, string>
): KeyCommandMap {
  const commands: Record<string, KeyCommand> = {};

  for (const [char, tuple] of Object.entries(rows)) {
    commands[char] = createCommandFromTuple(appLocale, tuple);
  }

  addShiftCommands(commands, appLocale, shiftedChars);

  return {
    id: `${keyboardLayout}-${appLocale}`,
    keyboardLayout,
    appLocale,
    inputLocale,
    commands
  };
}

function createRowsFromKeys(rows: string[]): Record<string, CommandTuple> {
  const commands: Record<string, CommandTuple> = {};
  const rowOffsets = [0, 12, 24];

  for (const [rowIndex, row] of rows.entries()) {
    const offset = rowOffsets[rowIndex] ?? 0;

    for (const [keyIndex, char] of Array.from(row).entries()) {
      const position = keyPositions[offset + keyIndex];

      if (!position) {
        continue;
      }

      const [hand, fingerNumber, ruPosition, enPosition] = position;
      const ruHand = hand === 'left' ? 'левой' : 'правой';
      const enHand = hand === 'left' ? 'left' : 'right';
      const ordinal = englishOrdinal(fingerNumber);

      commands[char] = [
        `${ruHand}, ${fingerNumber}-м, ${ruPosition}`,
        `${enHand}, ${ordinal}, ${enPosition}`,
        hand,
        fingerNumber,
        ruPosition,
        enPosition
      ];
    }
  }

  return commands;
}

function createSpokenCommand(appLocale: AppLocale, tuple: CommandTuple, position: string | undefined): string {
  const [ru, en, hand, fingerNumber] = tuple;

  if (appLocale === 'ru') {
    return ru;
  }

  if (appLocale === 'en') {
    return en;
  }

  const data = commandLocaleData[appLocale];

  if (!hand || !fingerNumber || !position) {
    return data.space;
  }

  const handText = hand === 'left' ? data.left : data.right;
  return `${handText}, ${data.finger(fingerNumber)}, ${position}`;
}

function translatePosition(appLocale: AppLocale, enPosition: string | undefined): string | undefined {
  if (!enPosition) {
    return undefined;
  }

  return commandLocaleData[appLocale].positions[enPosition] ?? enPosition;
}

function englishOrdinal(fingerNumber: 1 | 2 | 3 | 4): string {
  const ordinals: Record<1 | 2 | 3 | 4, string> = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th'
  };

  return ordinals[fingerNumber];
}
