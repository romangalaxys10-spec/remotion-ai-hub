# Prompt 07 — Vertical Short (1080×1920)

```text
Convert this project to a 35-second vertical Short (1080x1920, 30fps):

LAYOUT RULES
- Headlines max 2 lines, font 110px+, centered at 35% height
- Safe zones: nothing critical in top 25% (platform UI) or bottom 20% (captions bar)
- Bullets: max 2 per screen, font 44px minimum

STRUCTURE
- 6 scenes × ~175 frames: Hook → Problem → Insight → Proof → CTA → Loop-frame
  (last frame visually matches the first for seamless loop)

CONTENT
Hook: "Your helpdesk answers itself at 3am"
CTA: "Link in bio"

Keep src/data.ts as the single source of truth (new `vertical` flag).
Update the Composition dims, then `npx tsc --noEmit`.
```

**Tip:** render a single scene range while tuning: `npx remotion render Main out/s.mp4 --frames=0-175`.
