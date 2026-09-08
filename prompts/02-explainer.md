# Prompt 02 — Multi-scene explainer

Use after 01-scaffold, one scene per turn.

```text
Implement Scene02Problem (240 frames) in src/scenes/Scene02Problem.tsx:

CONTENT (from data.ts — do not hardcode text here)
- headline: "Editing is slow"
- bullets appearing sequentially: ["Open editor", "Find footage", "Render", "Wait"]

VISUAL
- Dark bg from palette; headline scales 0.9→1.0 with spring over 20 frames
- Bullets: staggered fade+slide-in every 45 frames, starting frame 40
- Progress bar at bottom showing scene progress (width = frame/durationInFrames)

CONSTRAINTS
- Same component skeleton as Scene01Intro
- All timing via useCurrentFrame() + interpolate(), exits in last 15 frames
- Register in Root.tsx inside the existing Sequence timeline

Then: `npx tsc --noEmit` and confirm the Root timeline frame math still sums
to 900. Do not render yet.
```

**Variations:** swap CONTENT for your script lines; for vertical video use 1080x1920 and cap bullets at 2 per screen.
