# Database Layout

MatrixType V1 has no database.

Browser-local preferences are stored in `localStorage`:

- selected interface language;
- selected keyboard layout;
- custom text by keyboard layout;
- custom text mode by keyboard layout;
- selected visual theme;
- trainer statistics: active typing time, typed characters, typed words, and last input timestamp.

Active typing time is intentionally browser-local. It pauses when more than 5 seconds pass without input, resumes on the next correct typed character, and is used for the current 3-hour skill target.
