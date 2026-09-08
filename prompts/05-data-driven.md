# Prompt 05 — Data-driven / programmatic video at scale

For videos generated from data: price feeds, leaderboards, changelogs, quiz videos.

```text
Build a data-driven composition "WeeklyReport":

INPUT: src/data/report.json (I will swap this file weekly — no code changes may be needed)
SCHEMA: { title, period, metrics: [{ label, value, delta, trend: number[] }],
          highlights: string[] }

REQUIREMENTS
- Each metric becomes an animated stat card: value counts up over 30 frames
  (interpolate to rounded display), trend rendered as an SVG sparkline
  (polyline scaled to min/max — deterministic)
- Highlights as staggered checklist
- All layout derived from the JSON array lengths — must render correctly
  with 3 or 30 metrics (grid with pagination if > 8)
- Validate report.json with zod at module load; throw readable errors

Also write src/data/report.example.json with 6 metrics.
```

**Why:** the agent builds a *renderer for data*, so future videos are a JSON swap + render command — fully scriptable, no agent needed after setup.
