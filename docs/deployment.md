# Deployment

MatrixType builds to static files and can be deployed to GitHub Pages.

```bash
npm run build
```

The production output is written to `dist/`.

GitHub Actions workflow `.github/workflows/ci.yml` runs tests and builds on pull requests. On pushes to `main`, it uploads `dist/` and deploys it to GitHub Pages.

For the first GitHub Pages deployment, enable Pages in the repository settings and choose GitHub Actions as the source.

If the live page intermittently shows a blank screen, check the served HTML:

```bash
curl -L https://coffeedev2k.github.io/matrixtype/ | grep 'src/main.ts'
```

The production page must not reference `/src/main.ts`. If it does, GitHub Pages is serving the repository root instead of the Vite `dist/` artifact. Switch repository Settings -> Pages -> Build and deployment -> Source to GitHub Actions, then rerun the workflow.
