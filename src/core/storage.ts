import type { StoredPreferences, TrainingSelection } from '../types';

const STORAGE_KEY = 'matrixtype.preferences.v1';

type LegacyStoredPreferences = Partial<StoredPreferences> & {
  customText?: unknown;
  useCustomText?: unknown;
};

export function loadPreferences(defaultSelection: TrainingSelection): StoredPreferences {
  const fallback: StoredPreferences = {
    selection: defaultSelection,
    customTexts: {},
    useCustomTextByLayout: {}
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw) as LegacyStoredPreferences;

    const customTexts = isRecord(parsed.customTexts)
      ? filterStringRecord(parsed.customTexts)
      : {};
    const useCustomTextByLayout = isRecord(parsed.useCustomTextByLayout)
      ? filterBooleanRecord(parsed.useCustomTextByLayout)
      : {};

    const preferences: StoredPreferences = {
      selection: {
        ...defaultSelection,
        ...parsed.selection
      },
      customTexts,
      useCustomTextByLayout
    };

    if (typeof parsed.customText === 'string') {
      preferences.customTexts[preferences.selection.keyboardLayout] = parsed.customText;
    }

    if (typeof parsed.useCustomText === 'boolean') {
      preferences.useCustomTextByLayout[preferences.selection.keyboardLayout] = parsed.useCustomText;
    }

    return preferences;
  } catch {
    return fallback;
  }
}

export function savePreferences(preferences: StoredPreferences): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

export function clearPreferences(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function filterStringRecord(value: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === 'string')) as Record<
    string,
    string
  >;
}

function filterBooleanRecord(value: Record<string, unknown>): Record<string, boolean> {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => typeof item === 'boolean')) as Record<
    string,
    boolean
  >;
}
