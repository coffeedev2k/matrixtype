export const appLocales = ['ru', 'en', 'es', 'pt', 'fr', 'de', 'it', 'pl', 'uk', 'tr', 'nl', 'cs', 'sk'] as const;

export type AppLocale = (typeof appLocales)[number];

export type CoreAppLocale = 'ru' | 'en' | 'es';

export type LocalizedText = Record<CoreAppLocale, string> & Partial<Record<AppLocale, string>>;

export type KeyboardLayoutId =
  | 'ru-qwerty'
  | 'en-us-qwerty'
  | 'es-es-qwerty'
  | 'es-latam-qwerty'
  | 'pt-br-abnt2'
  | 'pt-pt-qwerty'
  | 'fr-fr-azerty'
  | 'de-de-qwertz'
  | 'it-it-qwerty'
  | 'pl-pl-programmers'
  | 'uk-ua-jcuken'
  | 'tr-tr-qwerty'
  | 'tr-tr-f'
  | 'nl-us-intl'
  | 'cs-cz-qwertz'
  | 'sk-sk-qwertz';

export type Hand = 'left' | 'right';

export type FingerNumber = 1 | 2 | 3 | 4;

export interface KeyCommand {
  spokenCommand: string;
  hand?: Hand;
  fingerNumber?: FingerNumber;
  position?: string;
  baseChar?: string;
  requiresShift?: true;
}

export interface KeyCommandMap {
  id: string;
  keyboardLayout: KeyboardLayoutId;
  appLocale: AppLocale;
  inputLocale: string;
  commands: Record<string, KeyCommand>;
}

export interface KeyboardLayout {
  id: KeyboardLayoutId;
  label: LocalizedText;
  note: LocalizedText;
  inputLocale: string;
  defaultText: string;
  commandsByLocale: Record<AppLocale, KeyCommandMap>;
}

export interface TrainerConfig {
  defaultAppLocale: AppLocale;
  defaultKeyboardLayout: KeyboardLayoutId;
  defaultKeyboardLayoutByLocale: Record<AppLocale, KeyboardLayoutId>;
  keyboardLayouts: KeyboardLayout[];
}

export interface TrainingSelection {
  appLocale: AppLocale;
  keyboardLayout: KeyboardLayoutId;
}

export interface StoredPreferences {
  selection: TrainingSelection;
  customTexts: Partial<Record<KeyboardLayoutId, string>>;
  useCustomTextByLayout: Partial<Record<KeyboardLayoutId, boolean>>;
}
