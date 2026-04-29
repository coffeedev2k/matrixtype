export type AppLocale = 'ru' | 'en';

export type KeyboardLayoutId = 'ru-qwerty' | 'en-us-qwerty';

export type Hand = 'left' | 'right';

export type FingerNumber = 1 | 2 | 3 | 4;

export interface KeyCommand {
  spokenCommand: string;
  hand?: Hand;
  fingerNumber?: FingerNumber;
  position?: string;
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
  label: Record<AppLocale, string>;
  note: Record<AppLocale, string>;
  inputLocale: string;
  defaultText: string;
  commandsByLocale: Record<AppLocale, KeyCommandMap>;
}

export interface TrainerConfig {
  defaultAppLocale: AppLocale;
  defaultKeyboardLayout: KeyboardLayoutId;
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
