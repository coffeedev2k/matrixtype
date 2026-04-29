import { createDeadKeyLetters, createDirectKeyLayout } from './shared';
import type { CommandTuple, DeadKeyCommandConfig } from './shared';

const qwertyRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const qwertzRows = ['qwertzuiop', 'asdfghjkl', 'yxcvbnm'];
const acuteDeadKey: CommandTuple = ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'];
const graveDeadKey: CommandTuple = ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'];
const circumflexDeadKey: CommandTuple = ['правой, 4-м, вправо', 'right, 4th, right', 'right', 4, 'вправо', 'right'];
const tildeDeadKey: CommandTuple = ['правой, 4-м, вправо', 'right, 4th, right', 'right', 4, 'вправо', 'right'];
const diaeresisDeadKey: CommandTuple = ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'];
const caronDeadKey: CommandTuple = ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'];
const ringDeadKey: CommandTuple = ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'];
const commaKey: CommandTuple = ['правой, 2-м, вниз', 'right, 2nd, down', 'right', 2, 'вниз', 'down'];
const dotKey: CommandTuple = ['правой, 3-м, вниз', 'right, 3rd, down', 'right', 3, 'вниз', 'down'];
const slashKey: CommandTuple = ['правой, 4-м, вниз', 'right, 4th, down', 'right', 4, 'вниз', 'down'];
const semicolonKey: CommandTuple = ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'];
const apostropheKey: CommandTuple = ['правой, 4-м, вправо', 'right, 4th, right', 'right', 4, 'вправо', 'right'];
const minusKey: CommandTuple = ['правой, 4-м, высоко вверх по центру', 'right, 4th, high up center', 'right', 4, 'высоко вверх по центру', 'high up center'];
const qwertyPunctuationRows: Record<string, CommandTuple> = {
  ',': commaKey,
  '.': dotKey,
  '/': slashKey,
  ';': semicolonKey,
  "'": apostropheKey,
  '-': minusKey
};
const qwertzPunctuationRows: Record<string, CommandTuple> = {
  ',': commaKey,
  '.': dotKey,
  '-': slashKey,
  ';': commaKey,
  ':': dotKey
};
const polishAltGrChars = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'x',
  ż: 'z',
  Ą: 'A',
  Ć: 'C',
  Ę: 'E',
  Ł: 'L',
  Ń: 'N',
  Ó: 'O',
  Ś: 'S',
  Ź: 'X',
  Ż: 'Z'
};
const portugueseDeadKeyChars: DeadKeyCommandConfig[] = [
  ...createDeadKeyLetters('´', ['a', 'e', 'i', 'o', 'u'], 'pt-PT'),
  ...createDeadKeyLetters('^', ['a', 'e', 'o'], 'pt-PT'),
  ...createDeadKeyLetters('~', ['a', 'o'], 'pt-PT'),
  ...createDeadKeyLetters('`', ['a'], 'pt-PT')
];
const dutchDeadKeyChars: DeadKeyCommandConfig[] = [
  ...createDeadKeyLetters('´', ['a', 'e', 'i', 'o', 'u'], 'nl-NL'),
  ...createDeadKeyLetters('`', ['a', 'e', 'i', 'o', 'u'], 'nl-NL'),
  ...createDeadKeyLetters('^', ['a', 'e', 'i', 'o', 'u'], 'nl-NL'),
  ...createDeadKeyLetters('¨', ['a', 'e', 'i', 'o', 'u'], 'nl-NL')
];
const frenchDeadKeyChars: DeadKeyCommandConfig[] = [
  ...createDeadKeyLetters('^', ['a', 'e', 'i', 'o', 'u'], 'fr-FR'),
  ...createDeadKeyLetters('¨', ['e', 'i', 'u'], 'fr-FR')
];
const czechDeadKeyChars: DeadKeyCommandConfig[] = [
  ...createDeadKeyLetters('ˇ', ['c', 'd', 'e', 'n', 'r', 's', 't', 'z'], 'cs-CZ'),
  ...createDeadKeyLetters('´', ['a', 'e', 'i', 'o', 'u', 'y'], 'cs-CZ'),
  ...createDeadKeyLetters('˚', ['u'], 'cs-CZ')
];
const slovakDeadKeyChars: DeadKeyCommandConfig[] = [
  ...createDeadKeyLetters('ˇ', ['c', 'd', 'l', 'n', 'r', 's', 't', 'z'], 'sk-SK'),
  ...createDeadKeyLetters('´', ['a', 'e', 'i', 'l', 'o', 'r', 'u', 'y'], 'sk-SK'),
  ...createDeadKeyLetters('¨', ['a'], 'sk-SK'),
  ...createDeadKeyLetters('^', ['o'], 'sk-SK')
];

export const ptBrAbnt2Layout = createDirectKeyLayout({
  id: 'pt-br-abnt2',
  inputLocale: 'pt-BR',
  label: {
    ru: 'Португальская Бразилия ABNT2',
    en: 'Portuguese Brazil ABNT2',
    es: 'Portuguesa Brasil ABNT2'
  },
  note: {
    ru: 'Бразильская португальская раскладка ABNT2. В V1: прямые буквы и Shift; акценты через dead keys позже.',
    en: 'Brazilian Portuguese ABNT2 layout. V1: direct letters and Shift; accents through dead keys later.',
    es: 'Distribución portuguesa de Brasil ABNT2. V1: letras directas y Shift; acentos con teclas muertas después.'
  },
  defaultText: 'a manha calma tem cha e uma nuvem gato dedos respiram devagar',
  rows: ['qwertyuiop', 'asdfghjklç', 'zxcvbnm'],
  extraRows: {
    ...qwertyPunctuationRows,
    ';': commaKey,
    ':': dotKey,
    '`': graveDeadKey,
    '´': acuteDeadKey,
    '^': circumflexDeadKey,
    '~': tildeDeadKey
  },
  deadKeyChars: portugueseDeadKeyChars
});

export const ptPtQwertyLayout = createDirectKeyLayout({
  id: 'pt-pt-qwerty',
  inputLocale: 'pt-PT',
  label: {
    ru: 'Португальская Португалия QWERTY',
    en: 'Portuguese Portugal QWERTY',
    es: 'Portuguesa Portugal QWERTY'
  },
  note: {
    ru: 'Португальская раскладка Португалии. В V1: прямые буквы и Shift; акценты через dead keys позже.',
    en: 'Portugal Portuguese layout. V1: direct letters and Shift; accents through dead keys later.',
    es: 'Distribución portuguesa de Portugal. V1: letras directas y Shift; acentos con teclas muertas después.'
  },
  defaultText: 'a manha calma tem cha e uma nuvem gato dedos respiram devagar',
  rows: ['qwertyuiop', 'asdfghjklç', 'zxcvbnm'],
  extraRows: {
    ...qwertyPunctuationRows,
    ';': commaKey,
    ':': dotKey,
    '`': graveDeadKey,
    '´': acuteDeadKey,
    '^': circumflexDeadKey,
    '~': tildeDeadKey
  },
  deadKeyChars: portugueseDeadKeyChars
});

export const frFrAzertyLayout = createDirectKeyLayout({
  id: 'fr-fr-azerty',
  inputLocale: 'fr-FR',
  label: {
    ru: 'Французская AZERTY Франция',
    en: 'French AZERTY France',
    es: 'Francesa AZERTY Francia'
  },
  note: {
    ru: 'Французская AZERTY. В V1: прямые буквы, основные прямые акценты, Shift и dead keys для циркумфлекса/тремы.',
    en: 'French AZERTY layout. V1: direct letters, core direct accents, Shift, and dead keys for circumflex/diaeresis.',
    es: 'Distribución francesa AZERTY. V1: letras directas, acentos directos básicos, Shift y teclas muertas para circunflejo/diéresis.'
  },
  defaultText: 'un matin calme avec du thé une nuée chat respire les doigts restent prêts',
  rows: ['azertyuiop', 'qsdfghjklm', 'wxcvbn'],
  extraRows: {
    ',': commaKey,
    ';': dotKey,
    ':': slashKey,
    '!': slashKey,
    '-': ['правой, 1-м, высоко вверх', 'right, 1st, high up', 'right', 1, 'высоко вверх', 'high up'],
    é: ['левой, 3-м, высоко вверх', 'left, 3rd, high up', 'left', 3, 'высоко вверх', 'high up'],
    è: ['правой, 1-м, высоко вверх', 'right, 1st, high up', 'right', 1, 'высоко вверх', 'high up'],
    ç: ['правой, 3-м, высоко вверх', 'right, 3rd, high up', 'right', 3, 'высоко вверх', 'high up'],
    à: ['правой, 4-м, высоко вверх', 'right, 4th, high up', 'right', 4, 'высоко вверх', 'high up'],
    ù: ['правой, 4-м, вправо', 'right, 4th, right', 'right', 4, 'вправо', 'right'],
    '^': circumflexDeadKey,
    '¨': diaeresisDeadKey
  },
  deadKeyChars: frenchDeadKeyChars
});

export const deDeQwertzLayout = createDirectKeyLayout({
  id: 'de-de-qwertz',
  inputLocale: 'de-DE',
  label: {
    ru: 'Немецкая QWERTZ Германия',
    en: 'German QWERTZ Germany',
    es: 'Alemana QWERTZ Alemania'
  },
  note: {
    ru: 'Немецкая QWERTZ. В V1: прямые буквы, умлауты и Shift; AltGr-символы позже.',
    en: 'German QWERTZ layout. V1: direct letters, umlauts, and Shift; AltGr symbols later.',
    es: 'Distribución alemana QWERTZ. V1: letras directas, umlauts y Shift; símbolos AltGr después.'
  },
  defaultText: 'ein klarer morgen tee wartet eine katzenwolke finger atmen ruhig',
  rows: ['qwertzuiopü', 'asdfghjklöä', 'yxcvbnm'],
  extraRows: qwertzPunctuationRows
});

export const itItQwertyLayout = createDirectKeyLayout({
  id: 'it-it-qwerty',
  inputLocale: 'it-IT',
  label: {
    ru: 'Итальянская QWERTY',
    en: 'Italian QWERTY',
    es: 'Italiana QWERTY'
  },
  note: {
    ru: 'Итальянская раскладка. В V1: прямые буквы и Shift; акценты позже.',
    en: 'Italian layout. V1: direct letters and Shift; accents later.',
    es: 'Distribución italiana. V1: letras directas y Shift; acentos después.'
  },
  defaultText: 'un mattino calmo il te aspetta una nube gatto dita respirano piano',
  rows: qwertyRows,
  extraRows: qwertyPunctuationRows
});

export const plPlProgrammersLayout = createDirectKeyLayout({
  id: 'pl-pl-programmers',
  inputLocale: 'pl-PL',
  label: {
    ru: 'Польская программистская',
    en: 'Polish Programmers',
    es: 'Polaca programadores'
  },
  note: {
    ru: 'Польская программистская раскладка. В V1: прямые буквы, Shift и польские знаки через AltGr.',
    en: 'Polish Programmers layout. V1: direct letters, Shift, and Polish signs through AltGr.',
    es: 'Distribución polaca de programadores. V1: letras directas, Shift y signos polacos con AltGr.'
  },
  defaultText: 'ciepły ranek herbata czeka chmura kot palce oddychają spokojnie',
  rows: qwertyRows,
  extraRows: qwertyPunctuationRows,
  altGrChars: polishAltGrChars
});

export const ukUaJcukenLayout = createDirectKeyLayout({
  id: 'uk-ua-jcuken',
  inputLocale: 'uk-UA',
  label: {
    ru: 'Украинская ЙЦУКЕН',
    en: 'Ukrainian ЙЦУКЕН',
    es: 'Ucraniana ЙЦУКЕН'
  },
  note: {
    ru: 'Украинская стандартная раскладка. В V1: прямые буквы и Shift; апостроф и варианты ґ уточняются позже.',
    en: 'Ukrainian standard layout. V1: direct letters and Shift; apostrophe and ґ variants later.',
    es: 'Distribución ucraniana estándar. V1: letras directas y Shift; apóstrofo y variantes de ґ después.'
  },
  defaultText: 'тихий ранок чай чекає хмара кіт пальці дихають спокійно',
  rows: ['йцукенгшщзхї', 'фівапролджє', 'ячсмитьбю'],
  extraRows: {
    '.': ['правой, 3-м, вниз', 'right, 3rd, down', 'right', 3, 'вниз', 'down'],
    ',': ['правой, 2-м, вниз', 'right, 2nd, down', 'right', 2, 'вниз', 'down'],
    "'": apostropheKey,
    '-': minusKey,
    ґ: ['левой, 4-м, высоко вверх влево', 'left, 4th, high up left', 'left', 4, 'высоко вверх влево', 'high up left']
  }
});

export const trTrQwertyLayout = createDirectKeyLayout({
  id: 'tr-tr-qwerty',
  inputLocale: 'tr-TR',
  label: {
    ru: 'Турецкая Q',
    en: 'Turkish Q',
    es: 'Turca Q'
  },
  note: {
    ru: 'Турецкая QWERTY-раскладка. В V1: прямые турецкие буквы и Shift.',
    en: 'Turkish QWERTY-based layout. V1: direct Turkish letters and Shift.',
    es: 'Distribución turca basada en QWERTY. V1: letras turcas directas y Shift.'
  },
  defaultText: 'sakin sabah cay bekler kedi bulutu parmaklar yavas nefes alir',
  rows: ['qwertyuıopğü', 'asdfghjklşi', 'zxcvbnmöç'],
  extraRows: qwertyPunctuationRows
});

export const trTrFLayout = createDirectKeyLayout({
  id: 'tr-tr-f',
  inputLocale: 'tr-TR',
  label: {
    ru: 'Турецкая F',
    en: 'Turkish F',
    es: 'Turca F'
  },
  note: {
    ru: 'Турецкая F-раскладка. В V1: прямые турецкие буквы и Shift.',
    en: 'Turkish F layout. V1: direct Turkish letters and Shift.',
    es: 'Distribución turca F. V1: letras turcas directas y Shift.'
  },
  defaultText: 'sakin sabah cay bekler kedi bulutu parmaklar yavas nefes alir',
  rows: ['fgğıodrnhpqw', 'uieaütkmlyşx', 'jövcçzsb'],
  extraRows: qwertyPunctuationRows
});

export const nlUsIntlLayout = createDirectKeyLayout({
  id: 'nl-us-intl',
  inputLocale: 'nl-NL',
  label: {
    ru: 'Нидерландская US-International',
    en: 'Dutch US-International',
    es: 'Neerlandesa US-International'
  },
  note: {
    ru: 'Для нидерландского старта используем US-International. В V1: прямые буквы, Shift и dead keys для частых диакритик.',
    en: 'Dutch starts with US-International. V1: direct letters, Shift, and dead keys for common diacritics.',
    es: 'Para neerlandés empezamos con US-International. V1: letras directas, Shift y teclas muertas para diacríticos comunes.'
  },
  defaultText: 'een rustige morgen café en zeeën wachten vingers ademen kalm',
  rows: qwertyRows,
  extraRows: {
    ...qwertyPunctuationRows,
    '`': graveDeadKey,
    '´': acuteDeadKey,
    '^': circumflexDeadKey,
    '¨': diaeresisDeadKey
  },
  deadKeyChars: dutchDeadKeyChars
});

export const csCzQwertzLayout = createDirectKeyLayout({
  id: 'cs-cz-qwertz',
  inputLocale: 'cs-CZ',
  label: {
    ru: 'Чешская QWERTZ',
    en: 'Czech QWERTZ',
    es: 'Checa QWERTZ'
  },
  note: {
    ru: 'Чешская QWERTZ. В V1: прямые буквы, Shift и dead keys для чешской диакритики.',
    en: 'Czech QWERTZ layout. V1: direct letters, Shift, and dead keys for Czech diacritics.',
    es: 'Distribución checa QWERTZ. V1: letras directas, Shift y teclas muertas para diacríticos checos.'
  },
  defaultText: 'klidné ráno čaj čeká kočka a prsty dýchají pomalu',
  rows: qwertzRows,
  extraRows: {
    ...qwertzPunctuationRows,
    'ˇ': caronDeadKey,
    '´': acuteDeadKey,
    '˚': ringDeadKey
  },
  deadKeyChars: czechDeadKeyChars
});

export const skSkQwertzLayout = createDirectKeyLayout({
  id: 'sk-sk-qwertz',
  inputLocale: 'sk-SK',
  label: {
    ru: 'Словацкая QWERTZ',
    en: 'Slovak QWERTZ',
    es: 'Eslovaca QWERTZ'
  },
  note: {
    ru: 'Словацкая QWERTZ. В V1: прямые буквы, Shift и dead keys для словацкой диакритики.',
    en: 'Slovak QWERTZ layout. V1: direct letters, Shift, and dead keys for Slovak diacritics.',
    es: 'Distribución eslovaca QWERTZ. V1: letras directas, Shift y teclas muertas para diacríticos eslovacos.'
  },
  defaultText: 'pokojné ráno čaj čaká mačka a prsty dýchajú pomaly',
  rows: qwertzRows,
  extraRows: {
    ...qwertzPunctuationRows,
    'ˇ': caronDeadKey,
    '´': acuteDeadKey,
    '¨': diaeresisDeadKey,
    '^': circumflexDeadKey
  },
  deadKeyChars: slovakDeadKeyChars
});
