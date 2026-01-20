---
title: "PS5 Breakout"
display_title: "PS5 Break-<br>out"
skills: c++ HLSL
categories: academic solo
start: 11-2025
end: 11-2025
description:
    - Created an extensible breakout clone utilizing C++ and proprietary PS5 graphics libraries
    - Accelerated rendering performance through implementing instanced rendering
preview: /assets/images/break-out.png
---

## Overview

This is a solo graphics programming project built in C++ using proprietary PlayStation 5 graphics libraries. The project explores low-level rendering architecture and GPU instanced rendering through a modern implementation of a classic Breakout-style game.

## Rendering & Architecture

Rather than extending the provided rendering example, I reimplemented the rendering system from scratch based on the PS5 instanced rendering documentation. This allowed for a clearer understanding of the rendering pipeline and resulted in a more extensible and debuggable architecture.

The renderer explicitly manages buffer creation, ownership, and update frequency, separating static geometry from per-instance and per-frame data.

## Instanced Rendering

Instanced rendering is used to efficiently draw repeated objects such as bricks. Per-instance transform data is uploaded to the GPU, reducing draw calls and improving rendering performance while keeping the codebase scalable.

## Shaders & Limitations

Shader development included experimentation with procedural circle rendering in a pixel shader, prototyped in Shadertoy. While collision detection treats the ball as a circle, the final implementation renders it as polygonal geometry due to unresolved challenges passing data between shader stages and limited documentation on geometry shader output.

## Takeaways

This project strengthened my understanding of low-level graphics programming on modern hardware, particularly GPU data flow, buffer management, and instanced rendering. It also highlighted the importance of architectural clarity and informed technical scope decisions under time constraints.