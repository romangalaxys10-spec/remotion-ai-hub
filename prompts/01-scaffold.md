# Prompt 01 — Scaffold a video project

Use at the start of a session (agent should already have Remotion skills installed).

```text
Create a Remotion video project in this repository with the following spec:

FORMAT
- 1920x1080, 30fps, total 30 seconds (900 frames)

STRUCTURE
- src/data.ts: export a `video` object containing fps, dimensions, palette
  (bg #0B1220, accent #34D399, text #E7EDF5) and a `scenes` array
- One component per scene in src/scenes/, each accepting {durationInFrames}
- src/Root.tsx: registers the composition "Main" and maps data.ts scenes to
  <Sequence> elements. Frame budgets per scene: [90, 240, 240, 330]

RULES
- Deterministic only: random() from 'remotion' (seeded), no Math.random(),
  no Date.now(), no useEffect-driven visuals
- TypeScript strict, no `any`
- All text via a shared <Subtitle> component (font: Inter via @remotion/google-fonts)
- Every scene fades in via spring({fps, frame}) and fades out in its last 15 frames

When done: run `npx tsc --noEmit`, then list the files you created with their
frame budgets. Do NOT render an MP4 yet.
```

**Why this works:** the agent gets frame budgets (arithmetic, not vibes), a data-driven structure, and the determinism contract up front. You review `data.ts` before any layout exists.
