# Prompt 04 — Brand-locked styling

Use when the video must match a brand (logo, colors, fonts).

```text
Lock the project to this brand kit — enforce it across all scenes:

BRAND
- Colors: primary #4D6BFE, secondary #4ADE80, bg dark #0A0A0F, text #F5F7FA
- Font: "Inter" for body, "Space Grotesk" for headlines (via @remotion/google-fonts)
- Logo: brand/logo.svg (staticFile), always top-right at 4% margin, 90% opacity
- Corner radius 16px on all cards/panels, subtle border rgba(255,255,255,0.08)
- Motion language: spring({ damping: 200 }) for entrances — no bounce

TASK
1. Create src/brand.ts exporting these tokens as typed constants
2. Refactor all scenes to import from brand.ts — zero hardcoded colors/fonts
3. Reject any new color that is not in brand.ts (throw at build time)

Then run `npx tsc --noEmit` and grep for hex codes outside brand.ts — must be zero.
```

**Why:** brand.ts as the single source of truth means later agent turns can't drift the visual identity — the compiler enforces the brand.
