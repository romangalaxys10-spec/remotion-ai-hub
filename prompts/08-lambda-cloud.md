# Prompt 08 — Cloud render with Remotion Lambda

Use when render time matters (final renders, batches, long videos).

```text
Set up Lambda rendering for this project:

1. Install @remotion/lambda and @remotion/cli
2. Guide me through: npx remotion lambda sites create (I have AWS creds in env)
3. Deploy the site as "ryzendesk-videos"
4. Create a render function wrapper scripts/render-lambda.mjs:
   - args: compositionId, outputBucket key, props override (data.ts JSON)
   - uses distributeRender() with concurrency = 100
   - prints render progress + final URL
5. Add npm scripts: "render:cloud" and "render:cloud:qa" (half-scale)
6. Cost guard: log estimated cost before confirming (frames × price)

Do NOT execute the deploy — show me the plan and wait for confirmation.
```

**Notes:** Lambda needs an AWS account with S3 + Lambda permissions; costs scale with frames × concurrency. For most hub users, local rendering + `--scale` tuning is enough — Lambda is for batches and 4K.
