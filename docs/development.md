# Development Protocol

MatrixType uses pre-commit as the local quality gate. After code changes, run:

```bash
pre-commit run --all-files
```

The local hook runs `npm run check`, which performs:

- TypeScript typecheck.
- Vitest unit and UI tests.
- Production build.

Test placement:

- Put test logic in `tests/`.
- Keep `.pre-commit-config.yaml` as an orchestrator only.
- Use pre-commit hooks for formatting hygiene, config validation, and calling the project test suite.

The app has exactly three screens:

- Welcome screen: explains what the method is and what the learner must do.
- Trainer screen: explains how to train during the active exercise and accepts key input.
- Settings screen: lets the learner choose custom text and preferences.

Do not claim completion unless `pre-commit run --all-files` passes, or explicitly state why it could not be run.
