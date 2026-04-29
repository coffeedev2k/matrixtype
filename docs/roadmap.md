# Roadmap

Next useful steps:

- Keep the current CSS grayscale treatment for the hand asset for now; it works well enough as the base visual direction.
- Deepen direct-key layout packs with punctuation and regional variants after checking real keyboard layouts.
- Add lesson presets that start from the starting finger positions and gradually expand to the whole keyboard.
- Replace the current hand asset with a version where thumbs are separate visible fields. The thumb should remain unfilled when highlighting the active palm and numbered finger.
- Add a movement marker near the active finger: a circled cross for "in place" and path arrows for directional commands.
- Clarify the command grammar in the trainer flow: hand means which hand moves, number means the finger counted from the thumb, and position means the movement of that target finger.
- Design movement arrows as grid-step paths. Example: down-right is one step down and one step right; far up-left can be two repeated up-left steps. This should make the command system feel complete across the keyboard.
- Design dead-key support for Spanish accents before using accent-heavy Spanish texts.
- Add a public command-map editor for contributors, so new layouts can be reviewed without touching the trainer engine.

Done:

- Replaced the welcome headline with the longer Matrix/black-belt learning promise.
- Added multilingual SEO metadata, Open Graph/Twitter metadata, and `hreflang` tags to `index.html`.
- Added share links for Telegram, WhatsApp, X, and email on the welcome screen.
- Added the keyboard-and-hands reference image from `refs/123.png` to the welcome screen as `public/assets/keyboard-hands-reference.png`.
- Added a compact instruction panel on the trainer screen with the current rule: say the command, feel the movement, press the key.
- Added an error review panel that shows the symbols with the most wrong attempts in the current session.
- Added trainer statistics on the trainer screen: active typing time, typed characters, typed words, and word speed.
- Active typing time pauses after 5 seconds without input and resumes on the next correct typed character.
- Trainer statistics persist in `localStorage`.
- Added a 3-hour skill target: before the target the time card is yellow, after the target it becomes blue and shows three fireworks.
- Added tested visual themes in settings: `Matrix` and `Paper`.
- Replaced demo/test training texts with original calm text variants about morning, tea, a cat-shaped cloud, breathing, and patient fingers. Texts avoid copyrighted lyrics and unsupported dead-key/AltGr characters.
- Replaced the manually drawn trainer hands with `public/assets/hands-from-refs-numbered-v3.svg` as the base visual.
- The trainer overlays active palm and active numbered finger highlights on top of that vector asset using only `hand + fingerNumber`.
- Custom training text keeps its original case so advanced input behavior can be tested. Default layout texts still use V1 lowercase normalization.
- The trainer desaturates the hand asset dynamically and highlights the active hand and active finger in red using asset-derived paths.
- Added Spanish interface copy plus Spanish QWERTY Latin America and Spanish QWERTY Spain layout packs. See `docs/spanish-language-addition.md`.
- Added keyboard-first direct-key layout packs for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak. See `docs/language-layout-rollout.md`.
- Added interface-language support for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak.
