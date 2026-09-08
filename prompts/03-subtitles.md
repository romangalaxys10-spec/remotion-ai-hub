# Prompt 03 — Burnt-in subtitles

```text
Add accurate burnt-in subtitles to the composition:

1. Create src/subtitles.ts exporting an array:
   { startFrame, endFrame, text }[] covering the full video
2. Create src/components/Subtitles.tsx: renders the active line centered
   at the bottom (10% margin), Inter Bold 54px, white with a subtle
   black shadow, uppercase for emphasis words wrapped in *asterisks*
3. Mount it above all Sequences in Root.tsx (visible for the whole video)
4. Line timing must match the narration/beats in data.ts exactly

Constraints: no external SRT parsing; keep each line ≤ 42 chars;
max 2 lines on screen; deterministic rendering only.
```

**Tip:** If you have a script, paste it with rough timestamps in the same message and ask the agent to convert to frame ranges first (fps × seconds), then show you `subtitles.ts` for review before wiring.
