import type { AppLocale, KeyCommand, KeyCommandMap, KeyboardLayout } from '../../types';

type CommandTuple = [ru: string, en: string, hand?: 'left' | 'right', fingerNumber?: 1 | 2 | 3 | 4, ruPosition?: string, enPosition?: string];

const inputLocale = 'ru-RU';
const shiftedChars: Record<string, string> = Object.fromEntries(
  'ёйцукенгшщзхъфывапролджэячсмитьбю'.split('').map((char) => [char.toLocaleUpperCase(inputLocale), char])
);

const commandRows: Record<string, CommandTuple> = {
  ё: ['левой, 4-м, высоко вверх влево', 'left, 4th, high up left', 'left', 4, 'высоко вверх влево', 'high up left'],
  й: ['левой, 4-м, вверх', 'left, 4th, up', 'left', 4, 'вверх', 'up'],
  ц: ['левой, 3-м, вверх', 'left, 3rd, up', 'left', 3, 'вверх', 'up'],
  у: ['левой, 2-м, вверх', 'left, 2nd, up', 'left', 2, 'вверх', 'up'],
  к: ['левой, 1-м, вверх', 'left, 1st, up', 'left', 1, 'вверх', 'up'],
  е: ['левой, 1-м, вверх направо', 'left, 1st, up right', 'left', 1, 'вверх направо', 'up right'],
  н: ['правой, 1-м, вверх влево', 'right, 1st, up left', 'right', 1, 'вверх влево', 'up left'],
  г: ['правой, 1-м, вверх', 'right, 1st, up', 'right', 1, 'вверх', 'up'],
  ш: ['правой, 2-м, вверх', 'right, 2nd, up', 'right', 2, 'вверх', 'up'],
  щ: ['правой, 3-м, вверх', 'right, 3rd, up', 'right', 3, 'вверх', 'up'],
  з: ['правой, 4-м, вверх', 'right, 4th, up', 'right', 4, 'вверх', 'up'],
  х: ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'],
  ъ: ['правой, 4-м, вверх далеко вправо', 'right, 4th, far up right', 'right', 4, 'вверх далеко вправо', 'far up right'],

  ф: ['левой, 4-м, на месте', 'left, 4th, in place', 'left', 4, 'на месте', 'in place'],
  ы: ['левой, 3-м, на месте', 'left, 3rd, in place', 'left', 3, 'на месте', 'in place'],
  в: ['левой, 2-м, на месте', 'left, 2nd, in place', 'left', 2, 'на месте', 'in place'],
  а: ['левой, 1-м, на месте', 'left, 1st, in place', 'left', 1, 'на месте', 'in place'],
  п: ['левой, 1-м, вправо', 'left, 1st, right', 'left', 1, 'вправо', 'right'],
  р: ['правой, 1-м, влево', 'right, 1st, left', 'right', 1, 'влево', 'left'],
  о: ['правой, 1-м, на месте', 'right, 1st, in place', 'right', 1, 'на месте', 'in place'],
  л: ['правой, 2-м, на месте', 'right, 2nd, in place', 'right', 2, 'на месте', 'in place'],
  д: ['правой, 3-м, на месте', 'right, 3rd, in place', 'right', 3, 'на месте', 'in place'],
  ж: ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'],
  э: ['правой, 4-м, вправо', 'right, 4th, right', 'right', 4, 'вправо', 'right'],

  я: ['левой, 4-м, вниз', 'left, 4th, down', 'left', 4, 'вниз', 'down'],
  ч: ['левой, 3-м, вниз', 'left, 3rd, down', 'left', 3, 'вниз', 'down'],
  с: ['левой, 2-м, вниз', 'left, 2nd, down', 'left', 2, 'вниз', 'down'],
  м: ['левой, 1-м, вниз', 'left, 1st, down', 'left', 1, 'вниз', 'down'],
  и: ['левой, 1-м, вправо, вниз', 'left, 1st, right, down', 'left', 1, 'вправо, вниз', 'right, down'],
  т: ['правой, 1-м, вниз влево', 'right, 1st, down left', 'right', 1, 'вниз влево', 'down left'],
  ь: ['правой, 1-м, вниз', 'right, 1st, down', 'right', 1, 'вниз', 'down'],
  б: ['правой, 2-м, вниз', 'right, 2nd, down', 'right', 2, 'вниз', 'down'],
  ю: ['правой, 3-м, вниз', 'right, 3rd, down', 'right', 3, 'вниз', 'down'],

  ' ': ['пробел', 'space'],
  '.': ['правой, 4-м, вниз вправо', 'right, 4th, down right', 'right', 4, 'вниз вправо', 'down right'],
  ',': ['правой, 4-м, вниз вправо с шифтом', 'right, 4th, down right with shift', 'right', 4, 'вниз вправо с шифтом', 'down right with shift'],
  '!': ['левой, 4-м, высоко вверх с шифтом', 'left, 4th, high up with shift', 'left', 4, 'высоко вверх с шифтом', 'high up with shift'],
  '?': ['правой, 4-м, вниз вправо с шифтом', 'right, 4th, down right with shift', 'right', 4, 'вниз вправо с шифтом', 'down right with shift'],
  ';': ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'],
  ':': ['правой, 4-м, на месте с шифтом', 'right, 4th, in place with shift', 'right', 4, 'на месте с шифтом', 'in place with shift'],
  '-': ['правой, 4-м, высоко вверх по центру', 'right, 4th, high up center', 'right', 4, 'высоко вверх по центру', 'high up center'],
  '"': ['правой, 4-м, вправо с шифтом', 'right, 4th, right with shift', 'right', 4, 'вправо с шифтом', 'right with shift'],
  '(': ['правой, 3-м, высоко вверх с шифтом', 'right, 3rd, high up with shift', 'right', 3, 'высоко вверх с шифтом', 'high up with shift'],
  ')': ['правой, 4-м, высоко вверх влево с шифтом', 'right, 4th, high up left with shift', 'right', 4, 'высоко вверх влево с шифтом', 'high up left with shift']
};

export const ruQwertyLayout: KeyboardLayout = {
  id: 'ru-qwerty',
  label: {
    ru: 'Русская ЙЦУКЕН',
    en: 'Russian ЙЦУКЕН'
  },
  note: {
    ru: 'Русская клавиатура с открытыми командами на языке интерфейса.',
    en: 'Russian keyboard with open commands in the interface language.'
  },
  inputLocale,
  defaultText: 'а о л в. вода дала лад. рука помнит движение. произносите команду и нажимайте клавишу.',
  commandsByLocale: {
    ru: createCommandMap('ru'),
    en: createCommandMap('en')
  }
};

function createCommandMap(appLocale: AppLocale): KeyCommandMap {
  const commands: Record<string, KeyCommand> = {};

  for (const [char, [ru, en, hand, fingerNumber, ruPosition, enPosition]] of Object.entries(commandRows)) {
    const command: KeyCommand = {
      spokenCommand: appLocale === 'ru' ? ru : en
    };
    const position = appLocale === 'ru' ? ruPosition : enPosition;

    if (hand) {
      command.hand = hand;
    }

    if (fingerNumber) {
      command.fingerNumber = fingerNumber;
    }

    if (position) {
      command.position = position;
    }

    commands[char] = command;
  }

  addShiftCommands(commands, appLocale);

  return {
    id: `ru-qwerty-${appLocale}`,
    keyboardLayout: 'ru-qwerty',
    appLocale,
    inputLocale,
    commands
  };
}

function addShiftCommands(commands: Record<string, KeyCommand>, appLocale: AppLocale): void {
  const shiftSuffix = appLocale === 'ru' ? 'с Shift' : 'with Shift';

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
