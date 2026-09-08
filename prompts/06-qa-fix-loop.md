# Prompt 06 — The QA fix loop

Use after every render. Paste the QA tool output directly.

```text
I rendered out/test.mp4 (composition "Main", expected 30s @ 30fps = 900 frames).
QA tool output:

$ node tools/remotion-qa.mjs out/test.mp4
duration: 30.03s OK
frames extracted: 90
blank frames: 412-431 (20 frames) BLACK
frozen ranges: 700-830 (suspect, variance < 0.001)
audio: present, 30.0s

Diagnose and fix:
1. Blank 412-431 is inside Scene03's range (frames 390-630) — inspect
   src/scenes/Scene03.tsx for late asset loading or a conditional that
   renders nothing at those frames
2. Frozen 700-830 is Scene04 — likely missing animation; every scene must
   have frame-driven motion in its final third (exit animation)

Fix both, re-run `npx tsc --noEmit`, re-render ONLY frames 380-900
(--frames=380-900) to verify, then report what changed.
```

**Why it works:** the QA report converts vague "it's broken" into frame ranges, and re-rendering only the affected range keeps the fix loop under a minute.
