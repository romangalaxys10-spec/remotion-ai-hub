# Architecture Patterns for Agent-Built Remotion Videos

Patterns that make AI agents reliable at video. Every pattern exists because its absence produced a real failure.

## 1. Data-driven scenes

```ts
// src/data.ts — the ONLY file the human reviews first
export const video = {
  fps: 30,
  width: 1920, height: 1080,
  palette: { bg: '#0B1220', accent: '#34D399', text: '#E7EDF5' },
  scenes: [
    { component: 'Scene01Intro', durationInFrames: 120, headline: 'Ship videos with AI' },
    { component: 'Scene02Problem', durationInFrames: 210, headline: 'Editing is slow' },
  ],
}
```

Agents edit data → layout stays stable. Root.tsx maps `scenes` → `<Sequence>`. Review the data diff, not 400 lines of JSX.

## 2. One component per scene, identical skeleton

Every scene component gets the same shape: props `{ durationInFrames }`, local `const frame = useCurrentFrame()`, exits via interpolation. Agents copy the skeleton for new scenes — consistency is what you want from a machine.

## 3. Determinism contract

- `random()` from `remotion` (seeded), never `Math.random()`
- No `Date.now()`, no network fetches at frame time, no `useEffect`-driven state that changes between renders
- All entrance/exit animation via `interpolate(frame, ...)` or `spring({ fps, frame })`

This is the #1 cause of "blank video" bugs. State it in every prompt (the [agent rules file](../tools/agent-rules/remotion-rules.md) does it for you).

## 4. Timing is arithmetic, not vibes

Give agents frame budgets: "900 frames total: 120/210/240/330". Require `<Sequence from={...} durationInFrames={...}>` to sum exactly. The QA tool verifies final duration matches.

## 5. Iterate in Studio, verify by render, never trust "done"

- Studio (`npm run dev`) = free, instant visual iteration
- `npx remotion render` = the truth
- `tools/remotion-qa.mjs` = the referee (blank/frozen frames, duration)
- Loop: render → QA → paste report → fix → repeat until clean

## 6. Assets are code-reviewed too

Fonts via `@remotion/google-fonts` (typed, blocking, deterministic), images via `staticFile()` + `Img` (waits for load), audio via `Audio` with explicit `startFrom/volume`. Never raw `<img>`/`<audio>` tags — they race the frame capture.

## 7. Scale rules for agents

| Video length | Recommended approach |
|---|---|
| ≤ 30s | Single prompt, 4–6 scenes |
| 30–90s | data.ts-driven, one prompt per scene addition |
| 90s+ | Split into compositions per chapter + a master comp; consider `@remotion/lambda` for render speed |

## 8. Parallelization

Scenes are independent → agents can generate scene components in parallel sessions and you compose them. The QA tool guards the assembled result.
