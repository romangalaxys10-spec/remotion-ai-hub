# ZCode + GLM 5.3 Flash × Remotion — The Deep Guide

> This hub is authored and maintained **on ZCode with GLM 5.3 Flash**. Everything here was produced by exactly the workflow below, including the QA tooling. Consider it the reference setup.

---

## 1. Why this combo

| Factor | What you get |
|---|---|
| **GLM 5.3 Flash** | Very fast, very cheap per token — ideal for the *iterate-often* loop video work demands (10–30 agent turns per video is normal) |
| **Structured React output** | GLM 5.3 Flash is strong at disciplined, componentized TypeScript — exactly what Remotion compositions are |
| **ZCode skills system** | Remotion's official skills install into ZCode's skills root and persist across sessions |
| **ZCode tooling** | Built-in terminal + file tools handle the render → QA → fix loop without leaving the agent |

---

## 2. Setup (one time)

```bash
# 1. Project
npx create-video --yes --blank my-video && cd my-video && npm install

# 2. Official Remotion agent skills
npx skills add remotion-dev/skills

# 3. Make them visible to ZCode: copy the installed skills into ZCode's skills root
#    (default root: ~/.zcode/skills — adjust if you use a shared root like ~/.agents/skills)
mkdir -p ~/.zcode/skills
cp -R .claude/skills/* ~/.zcode/skills/ 2>/dev/null || true
cp -R node_modules/.remotion-skills/* ~/.zcode/skills/ 2>/dev/null || true
#    If the skills landed somewhere else, find them:
find . -maxdepth 4 -type d -name "*remotion*" -path "*skill*" 2>/dev/null

# 4. Drop this hub's portable skill + rules in as well
git clone https://github.com/romangalaxys10-spec/remotion-ai-hub.git
cp -R remotion-ai-hub/skills/remotion-agent ~/.zcode/skills/
cp remotion-ai-hub/tools/agent-rules/remotion-rules.md ~/.zcode/skills/remotion-agent/

# 5. Start Studio (terminal 1)
npm run dev

# 6. Start ZCode (terminal 2) inside the project
zcode
```

> GLM plan tip: Flash-tier models make the iteration loop nearly free. Save premium models for the final polish pass, not scaffolding.

---

## 3. The workflow that works (and why)

```
brief → data.ts → scene components → Studio check → render → QA tool → fix loop
```

1. **Write the brief as data, not prose.** Have GLM create `src/data.ts` first (scenes, on-screen text, durations, palette). Review *that* — it's cheap to edit.
2. **One component per scene.** Ask for `Scene01Intro.tsx`, `Scene02Problem.tsx`, … composed via `<Sequence>` in `Root.tsx`. Small files = small diffs = cheap iterations.
3. **Iterate in Studio**, never by re-rendering MP4s. Renders are for verification only.
4. **Render + QA after every meaningful change**: `node tools/remotion-qa.mjs out/test.mp4` (from this hub).
5. **Fix loop with the QA report pasted back into GLM** — see [prompts/06-qa-fix-loop.md](../../prompts/06-qa-fix-loop.md).

---

## 4. GLM 5.3 Flash prompting patterns

**Do:**
- Give the *spec*, not the vibe: durations per scene, exact texts, hex colors, fps, resolution.
- One change per turn. Flash-tier models stay sharpest with small, concrete edits.
- Ask for TypeScript strict: "Type all props. No `any`." — fewer runtime surprises at render time.
- Anchor timing math: "Total 30s at 30fps = 900 frames. Scene durations: 120/210/240/330 frames. Use `useCurrentFrame()` only."
- Say "deterministic": GLM must use `random(seed)` from `remotion`, never `Math.random()`.

**Avoid:**
- "Make it cinematic and cool" — you'll get generic gradient soup.
- Asking for audio + animation + brand + script in one prompt. Split turns.
- Letting it "optimize" `Root.tsx` unprompted — timing regressions live there.

**Power prompt (scene addition):**
```
Add Scene04CTA to src/scenes/Scene04CTA.tsx: 120 frames, dark bg #0B1220,
headline "Start free today" scaling from 0.9→1 with spring({fps, frame}),
subtext fade-in at frame 30. Register in Root.tsx after Scene03.
Follow the existing scene component pattern exactly.
```

---

## 5. ZCode-specific tips

- Keep **Studio in terminal 1, ZCode in terminal 2** in the project dir; ZCode's shell tools can see `npm run dev` output when needed but shouldn't own that process.
- Put this hub's `tools/remotion-qa.mjs` into the project (`tools/`) and tell ZCode once: *"After every render, run `node tools/remotion-qa.mjs <file>` and fix any reported issue before showing me."* — the loop then runs itself.
- Long renders: have ZCode run them **in background** and poll, so the session doesn't stall on a 3-minute encode.
- Sessions: skills are re-read on new ZCode sessions — after editing skills, start a fresh session.

---

## 6. Cost & speed control

| Trick | Effect |
|---|---|
| GLM 5.3 Flash for iteration, GLM premium for final polish | ~10–20× cheaper iteration phase |
| Render at half-res during QA (`--scale=0.5`) | ~4× faster verification renders |
| `--frames=` a single scene range while iterating | Seconds, not minutes |
| Keep scenes in separate files | Smaller context windows per turn |

---

## 7. Verification (non-negotiable)

Agents confidently claim "done" on videos that are black screens. Trust the pixels:

```bash
node tools/remotion-qa.mjs out/test.mp4
```

Checks: duration vs composition, blank/black frame ranges, frozen-frame detection, per-frame color variance. Paste failures back into GLM with [prompts/06-qa-fix-loop.md](../../prompts/06-qa-fix-loop.md).

---

## 8. Known pitfalls on this exact stack

- **macOS headless rendering**: Remotion's bundled `ffmpeg`/`compositor` may need `DYLD_LIBRARY_PATH` pointed at `node_modules/@remotion/compositor-darwin-arm64` when invoked from sandboxed shells. Symptom: render works in your terminal, fails from an agent's shell.
- **chrome-headless-shell throughput**: ~35–40 fps of rendering at 1080p on an M-series laptop. A 60s video ≈ 2–3 min render. Plan iteration budgets accordingly.
- **Don't pipe long-running renders through `tail`** in agent shells — output buffering can mask progress and stall automation.
- **First `npm run dev`** downloads the Remotion browser once; do it before the agent starts working.

---

## 9. Next steps

- [docs/patterns.md](../patterns.md) — architecture patterns for agent-built videos
- [docs/gotchas.md](../gotchas.md) — the full failure catalog
- [prompts/](../../prompts/) — copy-paste starting points
