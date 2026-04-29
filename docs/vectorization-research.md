# Raster To SVG Research

Goal: create hand visuals that follow the reference image closely instead of manually drawing approximate SVG paths.

## Findings

- VTracer is the strongest fit for this project because it is open source, can convert JPG/PNG to SVG, and supports color vectorization. Its docs describe it as a raster-to-vector converter that handles colored images, unlike Potrace-style binary-only workflows.
- Inkscape Trace Bitmap is also a viable manual route. Inkscape documentation describes tracing a bitmap into SVG paths and supports multicolor tracing where the number of output colors can be controlled.
- Potrace alone is not a good first choice for this hand reference because the source is colored. It is better suited to black-and-white tracing or as part of a tool that decomposes colors first.
- Random online converters may produce a quick visual result, but they are not reproducible in CI and may be unclear about data handling. Prefer a local repeatable pipeline.

## Current Asset Direction

The runtime hand guide is a checked-in public SVG asset with overlay hit regions for active hand and `fingerNumber`. Local reference images are optional research material and are not required for running, testing, or building the project.

## Next Step

If the hand asset is replaced later, keep the same runtime contract: a public SVG asset plus overlay hit regions for active hand and `fingerNumber`. Do not make the app depend on local reference folders.

References:

- VTracer: https://github.com/visioncortex/vtracer
- VTracer docs: https://www.visioncortex.org/vtracer-docs
- Inkscape Trace Bitmap tutorial: https://inkscape.org/cs/en/doc/tutorials/tracing/tutorial-tracing.html
