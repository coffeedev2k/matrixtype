import { enCopy } from './en';
import { esCopy } from './es';
import { csCopy, deCopy, frCopy, itCopy, nlCopy, plCopy, ptCopy, skCopy, trCopy, ukCopy } from './more';
import { ruCopy } from './ru';
import type { AppLocale } from '../types';
import type { AppCopy } from './types';

export const appCopy: Record<AppLocale, AppCopy> = {
  ru: ruCopy,
  en: enCopy,
  es: esCopy,
  pt: ptCopy,
  fr: frCopy,
  de: deCopy,
  it: itCopy,
  pl: plCopy,
  uk: ukCopy,
  tr: trCopy,
  nl: nlCopy,
  cs: csCopy,
  sk: skCopy
};
