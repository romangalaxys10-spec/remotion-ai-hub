# Gotchas Catalog — Headless Remotion with AI Agents

Real failures, real fixes. Contributed primarily from production runs driven by ZCode + GLM 5.3 Flash on macOS arm64; most items apply to all agents/OSes.

## Rendering

| Symptom | Cause | Fix |
|---|---|---|
| Render works in user terminal, fails from agent shell | Bundled compositor/ffmpeg can't find its dylibs when invoked from sandboxed/nested shells (macOS: `DYLD_LIBRARY_PATH` unset) | `export DYLD_LIBRARY_PATH="$PWD/node_modules/@remotion/compositor-darwin-arm64"` in the agent shell, or have the agent call `npx remotion render` from the project root |
| Render speed ~35–40 fps at 1080p | chrome-headless-shell capture throughput | Expected on M-series laptops; use `--scale=0.5` for QA renders, full res for final; consider `@remotion/lambda` for scale |
| Agent stalls mid-render | Long-running output piped through `tail`/buffered in some agent shells | Run renders in background and poll the output file, don't pipe |
| `Browser not installed` | First-run browser download pending | Run `npx remotion browser ensure` once before agent work |
| Wrong durations: video longer/shorter than planned | Scene `durationInFrames` don't sum to the `<Composition>` `durationInFrames` | QA tool compares; fix Root math (see patterns §4) |

## Determinism

| Symptom | Cause | Fix |
|---|---|---|
| Random blank segments | `Math.random()`/`Date.now()` in components | `random(seed)` from `remotion` |
| Element invisible at capture time | Raw `<img>`/`<video>` not loaded at frame N | `<Img>`/`<Video>`/`delayRender()` + `continueRender()` |
| Animation "jumps" between renders | Non-integer frame math (`frame / 2.5`) | Integer division guards; keep fps multipliers integral |

## Fonts & text

| Symptom | Cause | Fix |
|---|---|---|
| Wrong font in render, right in Studio | Font loaded async in Studio only | `@remotion/google-fonts` (blocks until loaded) or `delayRender` on `document.fonts.ready` |
| Text overflows frame | Agent guessed lengths | Constrain with `maxLines`, test longest string, reduce font size via `interpolate` on length |

## Audio

| Symptom | Cause | Fix |
|---|---|---|
| Silent MP4 | `Audio` src fetched over network at render time / wrong `startFrom` | Local `staticFile()` assets; verify with QA tool audio track check |
| Audio drifts from animation | fps mismatch between composition and source edit | Recompute `startFrom` in frames at the composition's fps |

## Agent-behavior

| Symptom | Cause | Fix |
|---|---|---|
| Agent rewrites `Root.tsx` unprompted, timings regress | Enthusiastic refactor | Rules file: "Never modify timing without explicit instruction" ([tools/agent-rules/remotion-rules.md](../tools/agent-rules/remotion-rules.md)) |
| Agent claims render succeeded | It saw exit code 0 of a *different* command | Always QA the actual MP4 file |
| Giant single-file composition after long session | Accreted edits | Refactor to per-scene files at scene boundaries |

## Licensing

Remotion is source-available: free for individuals and small teams, paid company license above that threshold, and some enterprise contexts require it regardless. Check [remotion.dev/docs/license](https://www.remotion.dev/docs/license) before commercial distribution — this hub is unaffiliated with Remotion BV.
