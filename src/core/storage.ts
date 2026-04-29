import type { StoredPreferences, TrainerStats, TrainingSelection, VisualTheme } from '../types';

const STORAGE_KEY = 'matrixtype.preferences.v1';
const emptyStats: TrainerStats = {
  activeMs: 0,
  typedChars: 0,
  typedWords: 0,
  lastInputAt: null
};

type LegacyStoredPreferences = Partial<StoredPreferences> & {
  customText?: unknown;
  useCustomText?: unknown;
};

export function loadPreferences(defaultSelection: TrainingSelection): StoredPreferences {
  const fallback: StoredPreferences = {
    selection: defaultSelection,
    customTexts: {},
    useCustomTextByLayout: {},
    theme: 'matrix',
    stats: { ...emptyStats }
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
      useCustomTextByLayout,
      theme: parseTheme(parsed.theme),
      stats: parseStats(parsed.stats)
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

function parseTheme(value: unknown): VisualTheme {
  return value === 'paper' ? 'paper' : 'matrix';
}

function parseStats(value: unknown): TrainerStats {
  if (!isRecord(value)) {
    return { ...emptyStats };
  }

  return {
    activeMs: typeof value.activeMs === 'number' ? Math.max(0, value.activeMs) : 0,
    typedChars: typeof value.typedChars === 'number' ? Math.max(0, value.typedChars) : 0,
    typedWords: typeof value.typedWords === 'number' ? Math.max(0, value.typedWords) : 0,
    lastInputAt: typeof value.lastInputAt === 'number' ? value.lastInputAt : null
  };
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
