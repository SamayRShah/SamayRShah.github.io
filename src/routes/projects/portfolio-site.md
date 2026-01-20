---
title: "Portfolio-site"
display_title: "Portfolio-<br>site"
skills: 3js svelte HLSL blender
categories: personal
start: 12-2025
end: 01-2026
description:
    - Created 3D portfolio website in svelte to learn svelte, and 3js
    - Created CRT shader with bit crushing, scan lines, pixelization and vignette effects
preview: /assets/images/portfolio-website.png
---

<h1 class="mt-2">[This Website]</h1>

## Overview
This website is both a portfolio and an ongoing graphics experiment. It was built as a way to explore real-time rendering on the web using Svelte and Three.js,

## Shader Work
I Created a custom CRT-style post-processing shader was implemented to explore screen-space effects and visual degradation. The shader combines:

- Bit crushing to reduce color fidelity
- Scan lines and pixelization to simulate display artifacts
- Vignette for focus and falloff
- Fish-eye effect for distorting scan lines to somewhat mimic old CRT displays

These effects are applied as a final render pass, emphasizing the pipeline rather than individual assets.

## Takeaways
This project served as a sandbox for experimenting with graphics concepts in a web context, including render loops, post-processing, and shader-driven aesthetics.
