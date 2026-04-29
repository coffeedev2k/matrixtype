import { createDirectKeyLayout } from './shared';

const qwertyRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const qwertzRows = ['qwertzuiop', 'asdfghjkl', 'yxcvbnm'];

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
  defaultText: 'o sol claro guia cada dedo devagar',
  rows: ['qwertyuiop', 'asdfghjklç', 'zxcvbnm']
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
  defaultText: 'o dia claro guia cada dedo devagar',
  rows: ['qwertyuiop', 'asdfghjklç', 'zxcvbnm']
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
    ru: 'Французская AZERTY. В V1: прямые буквы и Shift; акценты и специальные знаки позже.',
    en: 'French AZERTY layout. V1: direct letters and Shift; accents and special symbols later.',
    es: 'Distribución francesa AZERTY. V1: letras directas y Shift; acentos y signos especiales después.'
  },
  defaultText: 'la mer calme le matin danse avec le vent',
  rows: ['azertyuiop', 'qsdfghjklm', 'wxcvbn']
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
  defaultText: 'der tag ist klar und jede taste lernt ruhig',
  rows: ['qwertzuiopü', 'asdfghjklöä', 'yxcvbnm']
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
  defaultText: 'il sole calmo porta luce e mani lente',
  rows: qwertyRows
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
    ru: 'Польская программистская раскладка. В V1: прямые буквы и Shift; польские знаки через AltGr позже.',
    en: 'Polish Programmers layout. V1: direct letters and Shift; Polish signs through AltGr later.',
    es: 'Distribución polaca de programadores. V1: letras directas y Shift; signos polacos con AltGr después.'
  },
  defaultText: 'polski tekst prosty ma spokojny rytm',
  rows: qwertyRows
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
  defaultText: 'мова і руки тихо вчать нові клавіші',
  rows: ['йцукенгшщзхї', 'фівапролджє', 'ячсмитьбю'],
  extraRows: {
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
  defaultText: 'sakin bir gun eller yavas yazar',
  rows: ['qwertyuıopğü', 'asdfghjklşi', 'zxcvbnmöç']
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
  defaultText: 'sakin bir gun eller yavas yazar',
  rows: ['fgğıodrnhpqw', 'uieaütkmlyşx', 'jövcçzsb']
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
    ru: 'Для нидерландского старта используем US-International. В V1: прямые буквы и Shift; dead keys позже.',
    en: 'Dutch starts with US-International. V1: direct letters and Shift; dead keys later.',
    es: 'Para neerlandés empezamos con US-International. V1: letras directas y Shift; teclas muertas después.'
  },
  defaultText: 'een rustige dag leert handen kalm typen',
  rows: qwertyRows
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
    ru: 'Чешская QWERTZ. В V1: прямые буквы и Shift; диакритика через верхний ряд/dead keys позже.',
    en: 'Czech QWERTZ layout. V1: direct letters and Shift; diacritics through upper row/dead keys later.',
    es: 'Distribución checa QWERTZ. V1: letras directas y Shift; diacríticos después.'
  },
  defaultText: 'cesky text klidne vede prsty po klavesach',
  rows: qwertzRows
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
    ru: 'Словацкая QWERTZ. В V1: прямые буквы и Shift; диакритика через верхний ряд/dead keys позже.',
    en: 'Slovak QWERTZ layout. V1: direct letters and Shift; diacritics through upper row/dead keys later.',
    es: 'Distribución eslovaca QWERTZ. V1: letras directas y Shift; diacríticos después.'
  },
  defaultText: 'slovensky text pokojne vedie prsty po klavesoch',
  rows: qwertzRows
});
