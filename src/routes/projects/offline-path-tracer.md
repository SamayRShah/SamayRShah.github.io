---
title: 'Offline Path Tracer'
display_title: 'Offline<br>Path Tracer'
skills: c++
categories: academic
position: 'Programmer'
start: 02-2026
end: 03-2026
preview: /assets/images/offline-path-tracer.png
description:
    - Developed a CPU-based path tracer in C++ based on the *Ray Tracing in One Weekend* series
    - Implemented a Bounding Volume Hierarchy (BVH) to accelerate ray–object intersection tests
    - Improved rendering performance by reorganizing data structures using a Struct-of-Arrays layout
    - Added an interactive preview mode with lower resolution and fewer rays per pixel for faster scene iteration
---

## Github
[https://github.com/SamayRShah/OfflineRayTracer](https://github.com/SamayRShah/OfflineRayTracer)

## Overview
This project is a CPU-based offline path tracer written in C++. It follows the core ideas from Ray Tracing in One Weekend and extends them with performance improvements and usability features.

To accelerate rendering, I implemented a Bounding Volume Hierarchy (BVH) which reduces the number of ray–object intersection tests required per frame. I also refactored several data structures to use a Struct-of-Arrays layout to improve memory access patterns.

To make testing and iteration easier, I added a preview rendering mode that renders at a lower resolution with fewer rays per pixel, allowing the camera to be moved interactively before performing a full-quality render. The final image is exported as a PPM file.