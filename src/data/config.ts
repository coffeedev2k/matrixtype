import {
  csCzQwertzLayout,
  deDeQwertzLayout,
  frFrAzertyLayout,
  itItQwertyLayout,
  nlUsIntlLayout,
  plPlProgrammersLayout,
  ptBrAbnt2Layout,
  ptPtQwertyLayout,
  skSkQwertzLayout,
  trTrFLayout,
  trTrQwertyLayout,
  ukUaJcukenLayout
} from './layouts/additionalLayouts';
import { enUsQwertyLayout } from './layouts/enUsQwerty';
import { esEsQwertyLayout, esLatamQwertyLayout } from './layouts/spanishQwerty';
import { ruQwertyLayout } from './layouts/ruQwerty';
import type { TrainerConfig } from '../types';

export const trainerConfig: TrainerConfig = {
  defaultAppLocale: 'ru',
  defaultKeyboardLayout: 'ru-qwerty',
  defaultKeyboardLayoutByLocale: {
    ru: 'ru-qwerty',
    en: 'en-us-qwerty',
    es: 'es-latam-qwerty',
    pt: 'pt-br-abnt2',
    fr: 'fr-fr-azerty',
    de: 'de-de-qwertz',
    it: 'it-it-qwerty',
    pl: 'pl-pl-programmers',
    uk: 'uk-ua-jcuken',
    tr: 'tr-tr-qwerty',
    nl: 'nl-us-intl',
    cs: 'cs-cz-qwertz',
    sk: 'sk-sk-qwertz'
  },
  keyboardLayouts: [
    ruQwertyLayout,
    enUsQwertyLayout,
    esLatamQwertyLayout,
    esEsQwertyLayout,
    ptBrAbnt2Layout,
    ptPtQwertyLayout,
    frFrAzertyLayout,
    deDeQwertzLayout,
    itItQwertyLayout,
    plPlProgrammersLayout,
    ukUaJcukenLayout,
    trTrQwertyLayout,
    trTrFLayout,
    nlUsIntlLayout,
    csCzQwertzLayout,
    skSkQwertzLayout
  ]
};
