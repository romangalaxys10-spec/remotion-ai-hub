/**
 * The ONLY file you review first — agents edit this, not layout code.
 * Frame budgets must sum to fps * durationSeconds.
 */
export const video = {
  fps: 30,
  durationSeconds: 30,
  width: 1920,
  height: 1080,
  palette: {
    bg: '#0B1220',
    accent: '#34D399',
    text: '#E7EDF5',
  },
  scenes: [
    { component: 'Scene01Intro', durationInFrames: 90, headline: 'Ship videos with AI' },
    { component: 'Scene02Problem', durationInFrames: 240, headline: 'Editing is slow', bullets: ['Open editor', 'Find footage', 'Render', 'Wait'] },
    { component: 'Scene03Solution', durationInFrames: 240, headline: 'Prompt it instead' },
    { component: 'Scene04CTA', durationInFrames: 330, headline: 'Start free today' },
  ],
} as const
