# Remotion AI Hub 🎬🤖

**The central, community hub for creating programmatic videos with [Remotion](https://www.remotion.dev) using AI coding agents** — ZCode (GLM 5.3 Flash), Claude Code, OpenCode, Trae, Codex, Cursor and any agent that can write React.

> **Remotion** = Write videos in React. Render them server-side. Frame-perfect, deterministic, code-reviewed.
> **AI agents** = Your motion-design team that never sleeps.
> **This hub** = Everything that connects the two: guides, prompts, agent skills, templates, tools and battle-tested gotchas.

[![GitHub stars](https://img.shields.io/github/stars/romangalaxys10-spec/remotion-ai-hub?style=social)](https://github.com/romangalaxys10-spec/remotion-ai-hub/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Remotion](https://img.shields.io/badge/powered_by-Remotion-e14b8b)](https://www.remotion.dev)
[![GLM 5.3 Flash](https://img.shields.io/badge/tested_with-GLM%205.3%20Flash-4D6BFE)](https://z.ai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ⚡ 60-Second Start

```bash
# 1. Scaffold a blank Remotion project
npx create-video --yes --blank my-video && cd my-video && npm install

# 2. Install Remotion's official agent skills (works for most agents)
npx skills add remotion-dev/skills
#    …or inside an existing project:  npx remotion skills add

# 3. Start the studio preview (keep it running)
npm run dev

# 4. Launch your AI agent in a SECOND terminal and prompt your video
zcode   # or: claude / opencode / trae / codex
> "Create a 30-second dark-mode explainer with 4 scenes, kinetic typography,
>   and burnt-in subtitles. 1920x1080, 30fps."
```

Full per-agent walkthroughs: **[ZCode + GLM](docs/agents/zcode-glm.md) · [Claude Code](docs/agents/claude-code.md) · [OpenCode](docs/agents/opencode.md) · [Trae](docs/agents/trae.md)**

---

## 🤖 Agent Support Matrix

| Agent | Skill install | Guide | Notes |
|---|---|---|---|
| **ZCode (GLM 5.3 Flash)** ⭐ | `npx skills add remotion-dev/skills` → copy into skills root | [docs/agents/zcode-glm.md](docs/agents/zcode-glm.md) | Deepest guide: GLM prompting patterns, cost control, QA loop |
| **Claude Code** | `npx skills add remotion-dev/skills` (auto-loads `.claude/skills/`) | [docs/agents/claude-code.md](docs/agents/claude-code.md) | First-class Remotion support; docs auto-fetch via `.md` URLs |
| **OpenCode** | same | [docs/agents/opencode.md](docs/agents/opencode.md) | Remotion docs content-negotiation works out of the box |
| **Trae** | copy skills folder to Trae rules/skills dir | [docs/agents/trae.md](docs/agents/trae.md) | Paste [agent rules](tools/agent-rules/remotion-rules.md) into rules file |
| **Codex / Cursor / Kimi** | `npx skills add remotion-dev/skills` | [docs/patterns.md](docs/patterns.md) | Same patterns apply |

---

## 📦 What's in the hub

| Folder | Contents |
|---|---|
| [`docs/`](docs/) | Guides: per-agent setups, architecture patterns, gotchas, curated resources |
| [`prompts/`](prompts/) | Battle-tested copy-paste prompts: explainer videos, subtitles, brand kits, data-driven videos, QA-fix loops |
| [`skills/remotion-agent/`](skills/remotion-agent/) | Portable agent skill (SKILL.md) — drop into any agent's skills folder |
| [`templates/explainer-starter/`](templates/explainer-starter/) | Working multi-scene explainer starter (TypeScript, scenes, transitions) |
| [`tools/`](tools/) | `remotion-qa.mjs` render QA (blank-frame / frozen-frame detection) + agent rules file |
| [`docs/recipes/`](docs/recipes/) | Short recipes: subtitles, Lottie, charts, audio sync, vertical Shorts |

---

## 🧠 Core Principles (read this once, save hours)

1. **Deterministic frames** — never `Math.random()` or `Date.now()` in a composition; use `random()` from `remotion` (seeded) or `useCurrentFrame()`. AI agents love breaking this rule; the QA tool catches it.
2. **One scene = one component** — agents reason best about small, isolated scene components composed in a root `Sequence` timeline.
3. **Data-driven > hand-written** — feed scenes from a `data.ts` (script, colors, durations); agents edit data, not layout spaghetti.
4. **Preview + render are different beasts** — iterate in Studio (`npm run dev`), ship with `npx remotion render`. Headless rendering has its own gotchas → [docs/gotchas.md](docs/gotchas.md).
5. **Always QA** — run [`tools/remotion-qa.mjs`](tools/remotion-qa.mjs) after every render: detects blank/frozen frames, duration mismatches, silent audio.

---

## 🗺️ Learning Path

```
Beginner    → templates/explainer-starter + prompts/01-scaffold.md
Intermediate→ docs/patterns.md + prompts/02-explainer.md
Advanced    → docs/recipes/ + tools/remotion-qa.mjs in CI
Production  → docs/gotchas.md + licensing check (see FAQ)
```

---

## ❓ FAQ (AI-agent edition)

**Do I need to know React to use Remotion with an AI agent?**
No. The agent writes the React. Your job is a precise brief (audience, length, brand, script) and reviewing renders. Start with [prompts/01-scaffold.md](prompts/01-scaffold.md).

**Which AI model is best for Remotion?**
Any strong coding model works. This hub is maintained with **GLM 5.3 Flash** (fast, cheap, excellent at structured React) via **ZCode** — see the [ZCode guide](docs/agents/zcode-glm.md). Claude, GPT and GLM-max models all work.

**Why is my rendered video blank/black?**
The #1 agent bug: non-deterministic values (random/date) cause `Sequence` timing mismatches, or assets load after the frame is captured. Run `node tools/remotion-qa.mjs out.mp4` — it pinpoints blank/frozen frame ranges.

**Is Remotion free?**
The engine is source-available and free for individuals and small teams; larger companies need a paid company license. Read [remotion.dev/docs/license](https://www.remotion.dev/docs/license) before commercial use — this hub is unaffiliated with Remotion.

**Does this hub work with GLM / Z.ai models?**
Yes — it is actively maintained **on** ZCode with GLM 5.3 Flash. See [docs/agents/zcode-glm.md](docs/agents/zcode-glm.md) for model-specific prompting and QA patterns.

**Where are Remotion's official AI resources?**
[remotion.dev/docs/ai](https://www.remotion.dev/docs/ai) (AI-ready docs), [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills) (official skills), [remotion.dev/docs/ai/coding-agents](https://www.remotion.dev/docs/ai/coding-agents) (official workflow). This hub complements them with multi-agent guides, prompts and QA tooling.

---

## 🤝 Contributing

Prompts, agent guides, templates and gotchas are all welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). If an agent+model combo isn't listed, a PR adding it is the best contribution possible.

## ⭐ Spread the word

If this hub saved you hours, star the repo — it helps other builders find it. Share it with `#Remotion` + `#AIagents` on X, or link it from your agent's config gist.

## 📄 License

MIT — see [LICENSE](LICENSE). Remotion itself is licensed separately by Remotion BV; check their [license page](https://www.remotion.dev/docs/license).
