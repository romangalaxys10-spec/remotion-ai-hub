# Remotion Agent Rules

Paste into your agent's rules/instructions file (CLAUDE.md, AGENTS.md, Trae rules, etc.) for Remotion projects.

---

## Remotion project rules

- This is a Remotion project: videos are React components rendered frame-by-frame.
- **Determinism**: never use `Math.random()`, `Date.now()`, or fetch during render. Use `random(seed)` from the `remotion` package, `useCurrentFrame()`, `interpolate()`, `spring({ fps, frame })`.
- **Structure**: one component per scene in `src/scenes/`; scenes read texts/palette/durations from `src/data.ts`; `src/Root.tsx` registers `<Sequence>` elements whose `durationInFrames` must sum exactly to the composition duration. State the frame math before writing code.
- **Assets**: use `<Img>`, `<Video>`, `<Audio>` and `staticFile()`; fonts via `@remotion/google-fonts`. Never raw `<img>`/`<audio>` tags. Use `delayRender()`/`continueRender()` for anything genuinely async.
- **TypeScript strict; no `any`.**
- **Iteration**: visual changes are verified in Studio (`npm run dev`). MP4 renders are for verification only, and must be followed by the QA script (`node tools/remotion-qa.mjs out/<file>.mp4`). Fix every QA finding before declaring done.
- **Re-render smart**: use `--frames=from-to` to verify only affected ranges.
- **Never** modify `Root.tsx` timing without explicit instruction.
- **Never** claim a video is done based on exit code alone — only on QA output.
