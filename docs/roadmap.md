# Roadmap

Next useful steps:

- Add lesson presets that start from the starting finger positions and gradually expand to the whole keyboard.
- Replace the current hand asset with a version where thumbs are separate visible fields. The thumb should remain unfilled when highlighting the active palm and numbered finger.
- Add a public command-map editor for contributors, so new layouts can be reviewed without touching the trainer engine.

Done:

- Replaced the welcome headline with the longer Matrix/black-belt learning promise.
- Added multilingual SEO metadata, Open Graph/Twitter metadata, and `hreflang` tags to `index.html`.
- Added share links for Telegram, WhatsApp, X, and email on the welcome screen.
- Added `public/assets/keyboard.png` to the welcome screen as the learner-facing keyboard and hands reference.
- Added a compact instruction panel on the trainer screen with the current rule: say the command, feel the movement, press the key.
- Added an error review panel that shows the symbols with the most wrong attempts in the current session.
- Added trainer statistics on the trainer screen: active typing time, typed characters, typed words, and word speed.
- Active typing time pauses after 5 seconds without input and resumes on the next correct typed character.
- Trainer statistics persist in `localStorage`.
- Added a 3-hour skill target: before the target the time card is yellow, after the target it becomes blue and shows three fireworks.
- Replaced experimental visual themes with a stable day/night theme switcher in settings.
- Replaced demo/test training texts with original calm text variants about morning, tea, a cat-shaped cloud, breathing, and patient fingers. Texts avoid copyrighted lyrics and unsupported dead-key/AltGr characters.
- Added simple compound input support: direct keys, Shift-derived keys, AltGr-derived keys, and dead-key-derived characters.
- Added Spanish dead-key commands for `áéíóúÁÉÍÓÚüÜ`, and kept `ñÑ` as direct keys.
- Added Polish Programmer AltGr commands for `ąćęłńóśźż` and uppercase variants.
- Added real compound character maps for Portuguese, Dutch, French, Czech, and Slovak using the existing dead-key engine.
- Added app-level integration tests that generate a supported symbol corpus for every layout, set it as custom text, type it through the trainer input adapter, and verify completion.
- Replaced the manually drawn trainer hands with `public/assets/hands-numbered-v3.svg` as the base visual.
- The trainer overlays active palm and active numbered finger highlights on top of that vector asset using only `hand + fingerNumber`.
- Custom training text keeps its original case so advanced input behavior can be tested. Default layout texts still use V1 lowercase normalization.
- The trainer desaturates the hand asset dynamically and highlights the active hand and active finger in red using asset-derived paths.
- Added Spanish interface copy plus Spanish QWERTY Latin America and Spanish QWERTY Spain layout packs. See `docs/spanish-language-addition.md`.
- Added keyboard-first direct-key layout packs for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak. See `docs/language-layout-rollout.md`.
- Deepened direct-key layout packs with punctuation while keeping default training texts lowercase and punctuation-free.
- Added interface-language support for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak.
