import type { KeyboardLayout, KeyboardLayoutId } from '../../types';
import { createCommandMaps } from './shared';
import type { CommandTuple } from './shared';

const shiftedChars: Record<string, string> = Object.fromEntries(
  'abcdefghijklmnñopqrstuvwxyz'.split('').map((char) => [char.toLocaleUpperCase('es-ES'), char])
);

const commandRows: Record<string, CommandTuple> = {
  q: ['левой, 4-м, вверх', 'left, 4th, up', 'left', 4, 'вверх', 'up'],
  w: ['левой, 3-м, вверх', 'left, 3rd, up', 'left', 3, 'вверх', 'up'],
  e: ['левой, 2-м, вверх', 'left, 2nd, up', 'left', 2, 'вверх', 'up'],
  r: ['левой, 1-м, вверх', 'left, 1st, up', 'left', 1, 'вверх', 'up'],
  t: ['левой, 1-м, вверх направо', 'left, 1st, up right', 'left', 1, 'вверх направо', 'up right'],
  y: ['правой, 1-м, вверх влево', 'right, 1st, up left', 'right', 1, 'вверх влево', 'up left'],
  u: ['правой, 1-м, вверх', 'right, 1st, up', 'right', 1, 'вверх', 'up'],
  i: ['правой, 2-м, вверх', 'right, 2nd, up', 'right', 2, 'вверх', 'up'],
  o: ['правой, 3-м, вверх', 'right, 3rd, up', 'right', 3, 'вверх', 'up'],
  p: ['правой, 4-м, вверх', 'right, 4th, up', 'right', 4, 'вверх', 'up'],

  a: ['левой, 4-м, на месте', 'left, 4th, in place', 'left', 4, 'на месте', 'in place'],
  s: ['левой, 3-м, на месте', 'left, 3rd, in place', 'left', 3, 'на месте', 'in place'],
  d: ['левой, 2-м, на месте', 'left, 2nd, in place', 'left', 2, 'на месте', 'in place'],
  f: ['левой, 1-м, на месте', 'left, 1st, in place', 'left', 1, 'на месте', 'in place'],
  g: ['левой, 1-м, вправо', 'left, 1st, right', 'left', 1, 'вправо', 'right'],
  h: ['правой, 1-м, влево', 'right, 1st, left', 'right', 1, 'влево', 'left'],
  j: ['правой, 1-м, на месте', 'right, 1st, in place', 'right', 1, 'на месте', 'in place'],
  k: ['правой, 2-м, на месте', 'right, 2nd, in place', 'right', 2, 'на месте', 'in place'],
  l: ['правой, 3-м, на месте', 'right, 3rd, in place', 'right', 3, 'на месте', 'in place'],
  ñ: ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'],

  z: ['левой, 4-м, вниз', 'left, 4th, down', 'left', 4, 'вниз', 'down'],
  x: ['левой, 3-м, вниз', 'left, 3rd, down', 'left', 3, 'вниз', 'down'],
  c: ['левой, 2-м, вниз', 'left, 2nd, down', 'left', 2, 'вниз', 'down'],
  v: ['левой, 1-м, вниз', 'left, 1st, down', 'left', 1, 'вниз', 'down'],
  b: ['левой, 1-м, вправо, вниз', 'left, 1st, right, down', 'left', 1, 'вправо, вниз', 'right, down'],
  n: ['правой, 1-м, вниз влево', 'right, 1st, down left', 'right', 1, 'вниз влево', 'down left'],
  m: ['правой, 1-м, вниз', 'right, 1st, down', 'right', 1, 'вниз', 'down'],
  ',': ['правой, 2-м, вниз', 'right, 2nd, down', 'right', 2, 'вниз', 'down'],
  '.': ['правой, 3-м, вниз', 'right, 3rd, down', 'right', 3, 'вниз', 'down'],
  '-': ['правой, 4-м, вниз', 'right, 4th, down', 'right', 4, 'вниз', 'down'],

  ' ': ['пробел', 'space']
};

const spainExtraRows: Record<string, CommandTuple> = {
  ç: ['правой, 4-м, далеко вправо', 'right, 4th, far right', 'right', 4, 'далеко вправо', 'far right']
};

export const esEsQwertyLayout = createSpanishLayout({
  id: 'es-es-qwerty',
  inputLocale: 'es-ES',
  label: {
    ru: 'Испанская QWERTY Испания',
    en: 'Spanish QWERTY Spain',
    es: 'QWERTY española España'
  },
  note: {
    ru: 'Испанская раскладка Испании. В V1 поддержаны прямые клавиши, без dead keys для ударений.',
    en: 'Spanish Spain layout. V1 supports direct keys, without dead keys for accents.',
    es: 'Distribución española de España. V1 admite teclas directas, sin teclas muertas para acentos.'
  },
  rows: {
    ...commandRows,
    ...spainExtraRows
  }
});

export const esLatamQwertyLayout = createSpanishLayout({
  id: 'es-latam-qwerty',
  inputLocale: 'es-MX',
  label: {
    ru: 'Испанская QWERTY Латинская Америка',
    en: 'Spanish QWERTY Latin America',
    es: 'QWERTY española Latinoamérica'
  },
  note: {
    ru: 'Латиноамериканская испанская раскладка. В V1 поддержаны прямые клавиши, без dead keys для ударений.',
    en: 'Latin American Spanish layout. V1 supports direct keys, without dead keys for accents.',
    es: 'Distribución española latinoamericana. V1 admite teclas directas, sin teclas muertas para acentos.'
  },
  rows: commandRows
});

interface SpanishLayoutConfig {
  id: KeyboardLayoutId;
  inputLocale: string;
  label: KeyboardLayout['label'];
  note: KeyboardLayout['note'];
  rows: Record<string, CommandTuple>;
}

function createSpanishLayout(config: SpanishLayoutConfig): KeyboardLayout {
  return {
    id: config.id,
    label: config.label,
    note: config.note,
    inputLocale: config.inputLocale,
    defaultText: 'la mañana clara trae te. una nube gato sonrie. los dedos respiran lento.',
    commandsByLocale: createCommandMaps(config.id, config.inputLocale, config.rows, shiftedChars)
  };
}
