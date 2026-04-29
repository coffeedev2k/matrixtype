# Deployment

MatrixType builds to static files and can be deployed to GitHub Pages.

```bash
npm run build
```

The production output is written to `dist/`.

GitHub Actions workflow `.github/workflows/ci.yml` runs tests and builds on pull requests. On pushes to `main`, it uploads `dist/` and deploys it to GitHub Pages.

For the first GitHub Pages deployment, enable Pages in the repository settings and choose GitHub Actions as the source.
