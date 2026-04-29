# Architecture

The app is a static Vite + TypeScript site.

The UI has exactly three screens: Welcome, Trainer, Settings.

Core concepts are intentionally separate:

- `appLocale`: interface language.
- `keyboardLayout`: concrete keyboard layout.
- `defaultText`: training text attached to the selected keyboard layout.
- `keyCommandMap`: character-to-command data attached to the selected `appLocale` and `keyboardLayout`.

Open layout data lives in `src/data/layouts/`. Each layout pack stores labels, default text, input locale, and command maps for every supported interface language.

The trainer stays symbol-first in V1. Browser `KeyboardEvent.key` is treated as the typed symbol, while layout data may derive shifted symbols from base symbols. For example, English `S` reuses the `s` command with `baseChar = "s"` and `requiresShift = true`; the spoken command appends `with Shift` or `с Shift`. The app does not model left/right Shift, physical `KeyboardEvent.code`, dead keys, AltGr, CapsLock, IME, or compose sequences yet.
