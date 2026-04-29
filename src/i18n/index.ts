import { enCopy } from './en';
import { ruCopy } from './ru';
import type { AppLocale } from '../types';
import type { AppCopy } from './types';

export const appCopy: Record<AppLocale, AppCopy> = {
  ru: ruCopy,
  en: enCopy
};
