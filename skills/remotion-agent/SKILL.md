---
name: remotion-agent
description: >
  Create, edit and QA programmatic videos with Remotion (React-to-MP4).
  Use when the user asks to make, edit, render or fix a video, motion
  graphics, explainer, intro/outro, subtitles or vertical shorts — or when
  a task involves Remotion compositions, <Sequence> timing, or
  `npx remotion render`. Enforces deterministic frames, data-driven
  structure, Studio-first iteration and the render-QA-fix loop.
---

# Remotion Agent Skill

You are working with **Remotion** — videos written in React and rendered frame-perfectly. Follow these rules in every video task.

## Hard rules (never break)

1. **Deterministic frames.** No `Math.random()`, `Date.now()`, or network fetches during render. Use `random(seed)` from `remotion`, `useCurrentFrame()`, `interpolate()`, `spring()`.
2. **Frame budgets are arithmetic.** Scene `durationInFrames` must sum exactly to the `<Composition>` duration. State the sum before writing code.
3. **One scene = one component** in `src/scenes/`, registered via `<Sequence>` in `Root.tsx`. Data (texts, palette, durations) lives in `src/data.ts` — scenes read from it.
4. **Assets that load**: `<Img>`, `<Video>`, `<Audio>` from `staticFile()`, fonts via `@remotion/google-fonts`. Never raw tags. Use `delayRender()` only for genuinely async work.
5. **TypeScript strict, no `any`.**

## Workflow

1. Scaffold (new projects): `npx create-video --yes --blank <name> && cd <name> && npm i && npx skills add remotion-dev/skills`
2. Write `src/data.ts` first; show it to the user before building scenes.
3. Iterate in Studio (`npm run dev`) — do NOT render MP4s for iteration.
4. Verify with: `npx tsc --noEmit`, then `npx remotion render <Comp> out/<name>.mp4`.
5. **QA every render**: blank/black frames, frozen ranges, duration mismatch → fix and re-render only affected frame ranges (`--frames=from-to`).

## Prompt interface

When the brief is vague, ask for exactly these five things: audience, duration (seconds), resolution + fps, key messages (per scene), brand (colors/fonts/logo). Then produce `data.ts` for approval.

## Common fixes

- Blank segment → late-loading asset or conditional rendering nothing (QA the frame range).
- Frozen tail → missing exit animation; every scene ends with motion in its final 15 frames.
- Font mismatch in render → fonts must be loaded via `@remotion/google-fonts` or `delayRender`.
- Headless render fails in agent shells → set `DYLD_LIBRARY_PATH` to the `@remotion/compositor-*` package dir (macOS).

## Reference

- Docs (AI-ready, append `.md`): https://www.remotion.dev/docs/ai
- Hub: https://github.com/romangalaxys10-spec/remotion-ai-hub
