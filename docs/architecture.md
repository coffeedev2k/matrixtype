# Architecture

The app is a static Vite + TypeScript site.

The UI has exactly three screens: Welcome, Trainer, Settings.

Current interface languages are Russian, English, Spanish, Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak.

Core concepts are intentionally separate:

- `appLocale`: interface language.
- `keyboardLayout`: concrete keyboard layout.
- `defaultText`: training text attached to the selected keyboard layout.
- `keyCommandMap`: character-to-command data attached to the selected `appLocale` and `keyboardLayout`.

Open layout data lives in `src/data/layouts/`. Each layout pack stores labels, default text, input locale, and command maps for every supported interface language. Current training layouts are tracked in [Language Layout Rollout](language-layout-rollout.md).

The trainer stays symbol-first in V1. Browser `KeyboardEvent.key` is treated as the typed symbol, while layout data may derive shifted symbols from base symbols. For example, English `S` reuses the `s` command with `baseChar = "s"` and `requiresShift = true`; the spoken command appends `with Shift` or `с Shift`. The app does not model left/right Shift, physical `KeyboardEvent.code`, dead keys, AltGr, CapsLock, IME, or compose sequences yet.

Browser-local state lives in `localStorage`: selection, custom text by layout, selected visual theme, and trainer statistics. The statistics layer is intentionally simple: active time only accumulates between correct inputs when the previous input was no more than 5 seconds ago.

Spanish layout notes live in [Spanish Language Addition Notes](spanish-language-addition.md). New layout workflow lives in [Add A Keyboard Layout](add-keyboard-layout.md). Accented vowels and other composed characters are intentionally deferred until dead-key support is designed.
