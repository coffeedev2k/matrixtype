# Raster To SVG Research

Goal: create hand visuals that follow the reference image closely instead of manually drawing approximate SVG paths.

## Findings

- VTracer is the strongest fit for this project because it is open source, can convert JPG/PNG to SVG, and supports color vectorization. Its docs describe it as a raster-to-vector converter that handles colored images, unlike Potrace-style binary-only workflows.
- Inkscape Trace Bitmap is also a viable manual route. Inkscape documentation describes tracing a bitmap into SVG paths and supports multicolor tracing where the number of output colors can be controlled.
- Potrace alone is not a good first choice for this hand reference because the source is colored. It is better suited to black-and-white tracing or as part of a tool that decomposes colors first.
- Random online converters may produce a quick visual result, but they are not reproducible in CI and may be unclear about data handling. Prefer a local repeatable pipeline.

## Local Experiment

An experiment was generated with the Python `vtracer` package from `refs/b5eca04d4b9f034c1e76d9cefe1ad306.jpg`:

- `public/assets/hands-reference.svg`: cropped hands section.
- `public/assets/keyboard-hands-reference.svg`: full keyboard and hands reference.

The generation used color mode, stacked hierarchy, spline paths, and aggressive simplification to keep SVG files small enough for the repository.

## Next Step

Compare `public/assets/hands-reference.svg` visually against the current hand component. If it is better, replace the manually drawn SVG hand component with the generated asset plus overlay hit regions for active hand and `fingerNumber`.

References:

- VTracer: https://github.com/visioncortex/vtracer
- VTracer docs: https://www.visioncortex.org/vtracer-docs
- Inkscape Trace Bitmap tutorial: https://inkscape.org/cs/en/doc/tutorials/tracing/tutorial-tracing.html
