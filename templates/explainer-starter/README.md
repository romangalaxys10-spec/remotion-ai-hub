# explainer-starter

Working multi-scene explainer starter for AI-agent-driven Remotion videos (30s @ 1080p30).

## Use

```bash
npm install
npx remotion browser ensure   # first run only
npm run dev                   # Studio preview
npm run render && npm run qa  # render + QA (expects hub tools/ sibling)
```

## Structure

- `src/data.ts` — **edit this first**: texts, palette, scene frame budgets
- `src/Root.tsx` — composition + scene registry (agents add scenes here)
- `scenes` are inline examples to copy — extract to `src/scenes/*.tsx` as they grow

## For agents

See the hub's [agent rules](../../tools/agent-rules/remotion-rules.md) and [prompts](../../prompts/).
