# Recipes

Short, focused patterns. All assume the hub's rules file is loaded.

## Subtitles from an SRT

```text
Convert subs.srt to src/subtitles.ts: {startFrame, endFrame, text}[]
at the composition fps (30). Then render via a <SequenceSeries> mounted
above all scenes. Line cap 42 chars, 2 lines max.
```

## Lottie animations

```text
Install @remotion/lottie. Load staticFile('anim.json') via <Lottie>.
Loop with loop={true}; drive progress with useCurrentFrame() — never
autoplay. Duration must be set explicitly in frames.
```

## Animated charts

```text
Given data.trend: number[], render an SVG polyline: x spread across
durationInFrames, y scaled between min/max with 10% padding. Animate
with strokeDasharray trick: interpolate frame → dashoffset. Deterministic.
```

## Audio sync

```text
Mount audio via <Audio src={staticFile('voice.mp3')} />. Beat markers in
data.ts as seconds — convert to frames (fps × s). Scene cuts must land on
markers. Verify with the QA tool that audio exists and duration matches.
```

## Vertical Shorts (1080×1920)

```text
Change composition width/height; font sizes ×1.4; max 2 bullets per
screen; safe zones: keep text within central 80% (top 25% is UI-covered
on TikTok, bottom 20% on Reels).
```
