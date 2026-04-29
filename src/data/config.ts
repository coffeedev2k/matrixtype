import { enUsQwertyLayout } from './layouts/enUsQwerty';
import { ruQwertyLayout } from './layouts/ruQwerty';
import type { TrainerConfig } from '../types';

export const trainerConfig: TrainerConfig = {
  defaultAppLocale: 'ru',
  defaultKeyboardLayout: 'ru-qwerty',
  keyboardLayouts: [ruQwertyLayout, enUsQwertyLayout]
};
