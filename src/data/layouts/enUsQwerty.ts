import type { KeyboardLayout } from '../../types';
import { createCommandMaps } from './shared';
import type { CommandTuple } from './shared';

const inputLocale = 'en-US';
const shiftedChars: Record<string, string> = Object.fromEntries(
  'abcdefghijklmnopqrstuvwxyz'.split('').map((char) => [char.toUpperCase(), char])
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
  '[': ['правой, 4-м, вверх вправо', 'right, 4th, up right', 'right', 4, 'вверх вправо', 'up right'],
  ']': ['правой, 4-м, вверх далеко вправо', 'right, 4th, far up right', 'right', 4, 'вверх далеко вправо', 'far up right'],

  a: ['левой, 4-м, на месте', 'left, 4th, in place', 'left', 4, 'на месте', 'in place'],
  s: ['левой, 3-м, на месте', 'left, 3rd, in place', 'left', 3, 'на месте', 'in place'],
  d: ['левой, 2-м, на месте', 'left, 2nd, in place', 'left', 2, 'на месте', 'in place'],
  f: ['левой, 1-м, на месте', 'left, 1st, in place', 'left', 1, 'на месте', 'in place'],
  g: ['левой, 1-м, вправо', 'left, 1st, right', 'left', 1, 'вправо', 'right'],
  h: ['правой, 1-м, влево', 'right, 1st, left', 'right', 1, 'влево', 'left'],
  j: ['правой, 1-м, на месте', 'right, 1st, in place', 'right', 1, 'на месте', 'in place'],
  k: ['правой, 2-м, на месте', 'right, 2nd, in place', 'right', 2, 'на месте', 'in place'],
  l: ['правой, 3-м, на месте', 'right, 3rd, in place', 'right', 3, 'на месте', 'in place'],
  ';': ['правой, 4-м, на месте', 'right, 4th, in place', 'right', 4, 'на месте', 'in place'],

  z: ['левой, 4-м, вниз', 'left, 4th, down', 'left', 4, 'вниз', 'down'],
  x: ['левой, 3-м, вниз', 'left, 3rd, down', 'left', 3, 'вниз', 'down'],
  c: ['левой, 2-м, вниз', 'left, 2nd, down', 'left', 2, 'вниз', 'down'],
  v: ['левой, 1-м, вниз', 'left, 1st, down', 'left', 1, 'вниз', 'down'],
  b: ['левой, 1-м, вправо, вниз', 'left, 1st, right, down', 'left', 1, 'вправо, вниз', 'right, down'],
  n: ['правой, 1-м, вниз влево', 'right, 1st, down left', 'right', 1, 'вниз влево', 'down left'],
  m: ['правой, 1-м, вниз', 'right, 1st, down', 'right', 1, 'вниз', 'down'],
  ',': ['правой, 2-м, вниз', 'right, 2nd, down', 'right', 2, 'вниз', 'down'],
  '.': ['правой, 3-м, вниз', 'right, 3rd, down', 'right', 3, 'вниз', 'down'],

  ' ': ['пробел', 'space'],
  '-': ['правой, 4-м, высоко вверх по центру', 'right, 4th, high up center', 'right', 4, 'высоко вверх по центру', 'high up center'],
  '"': ['правой, 4-м, вправо с шифтом', 'right, 4th, right with shift', 'right', 4, 'вправо с шифтом', 'right with shift'],
  '(': ['правой, 3-м, высоко вверх с шифтом', 'right, 3rd, high up with shift', 'right', 3, 'высоко вверх с шифтом', 'high up with shift'],
  ')': ['правой, 4-м, высоко вверх влево с шифтом', 'right, 4th, high up left with shift', 'right', 4, 'высоко вверх влево с шифтом', 'high up left with shift']
};

export const enUsQwertyLayout: KeyboardLayout = {
  id: 'en-us-qwerty',
  label: {
    ru: 'Английская QWERTY',
    en: 'English QWERTY',
    es: 'QWERTY inglesa'
  },
  note: {
    ru: 'Английская клавиатура с командами на языке интерфейса.',
    en: 'English keyboard with commands in the interface language.',
    es: 'Teclado inglés con comandos en el idioma de la interfaz.'
  },
  inputLocale,
  defaultText: 'warm morning tea waits. a cloud cat smiles. fingers breathe slowly.',
  commandsByLocale: createCommandMaps('en-us-qwerty', inputLocale, commandRows, shiftedChars)
};
