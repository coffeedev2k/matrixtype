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

The trainer stays symbol-first in V1. Browser `KeyboardEvent.key` is treated as the typed symbol for direct keys, while an input capture adapter also listens to `input` and `compositionend` for composed text produced by dead keys. Layout data can derive:

- Shift symbols, for example `S` from `s`.
- AltGr symbols, for example Polish `ł` from `l`.
- Dead-key symbols, for example Spanish `á` from acute dead key plus `a`.

The spoken command for a dead-key symbol is composed as two commands: first the dead key, then the base key. Hand highlighting stays on the base key in this pass. The app does not model left/right Shift, physical `KeyboardEvent.code`, CapsLock, IME candidate windows, or long compose sequences yet.

Browser-local state lives in `localStorage`: selection, custom text by layout, selected visual theme, and trainer statistics. The statistics layer is intentionally simple: active time only accumulates between correct inputs when the previous input was no more than 5 seconds ago.

Spanish layout notes live in [Spanish Language Addition Notes](spanish-language-addition.md). New layout workflow lives in [Add A Keyboard Layout](add-keyboard-layout.md).
