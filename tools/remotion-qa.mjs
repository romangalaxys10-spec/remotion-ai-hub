#!/usr/bin/env node
/**
 * remotion-qa.mjs — post-render QA for Remotion outputs.
 *
 * Checks an MP4 for: duration mismatch, blank/black frame ranges,
 * frozen (suspiciously static) ranges, and audio presence.
 *
 * Usage:
 *   node remotion-qa.mjs out/video.mp4 [expectedSeconds]
 *
 * Deps (dev): ffmpeg-static, pngjs   →  npm i -D ffmpeg-static pngjs
 * Exit code 0 = pass, 1 = findings (paste output back to your agent).
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
let ffmpegPath, PNG
try {
  ffmpegPath = require('ffmpeg-static')
  PNG = require('pngjs').PNG
} catch {
  console.error('Missing deps. Run: npm i -D ffmpeg-static pngjs')
  process.exit(2)
}

const [, , file, expectedSecArg] = process.argv
if (!file || !fs.existsSync(file)) {
  console.error(`Usage: node remotion-qa.mjs <video.mp4> [expectedSeconds]`)
  process.exit(2)
}

// 1. Probe duration + audio
let duration = 0, hasAudio = false
function probeFile() {
  let out = ''
  try {
    out = execFileSync(ffmpegPath, ['-hide_banner', '-i', file, '-f', 'null', '-'], { stdio: ['ignore', 'ignore', 'pipe'], maxBuffer: 1024 * 1024 * 64 }).toString()
  } catch (e) {
    out = (e.stderr || '').toString()
  }
  const dur = out.match(/Duration: (\d+):(\d+):(\d+\.\d+)/)
  if (dur) duration = +dur[1] * 3600 + +dur[2] * 60 + +dur[3]
  hasAudio = /Audio:/.test(out)
}
probeFile()

const expectedSec = expectedSecArg ? Number(expectedSecArg) : null
console.log(`file: ${file}`)
console.log(`duration: ${duration.toFixed(2)}s${expectedSec ? ` (expected ${expectedSec}s)` : ''}`)
console.log(`audio: ${hasAudio ? 'present' : 'MISSING'}`)

const findings = []
if (duration < 0.2) findings.push('FATAL: file shorter than 0.2s — render failed?')
if (expectedSec && Math.abs(duration - expectedSec) > 0.5)
  findings.push(`DURATION MISMATCH: got ${duration.toFixed(2)}s, expected ${expectedSec}s — check Scene durationInFrames sum`)
if (!hasAudio) findings.push('AUDIO MISSING: no audio stream (add one, or this is intentional)')

// 2. Extract frames at 1fps (sample) and analyze pixels
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rd-qa-'))
console.log('extracting 1 sample frame/second…')
execFileSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-i', file, '-vf', 'fps=1,scale=320:-1', path.join(tmp, 'f%04d.png')])

const frames = fs.readdirSync(tmp).filter((f) => f.endsWith('.png')).sort()
let blankRanges = [], frozen = [], prevSig = null, prevIdx = null, runStart = null

function analyze(pngPath) {
  const png = PNG.sync.read(fs.readFileSync(pngPath))
  const { width, height, data } = png
  let sum = 0, sumSq = 0, n = 0
  const step = 4 * 16 // sample every 16th pixel
  for (let i = 0; i < data.length; i += step) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    sum += lum; sumSq += lum * lum; n++
  }
  const mean = sum / n
  const variance = sumSq / n - mean * mean
  return { mean, variance: Math.sqrt(variance) }
}

frames.forEach((f, i) => {
  const sec = i + 1
  const { mean, variance } = analyze(path.join(tmp, f))
  if (mean < 6 && variance < 3) {
    if (runStart === null) runStart = sec
  } else {
    if (runStart !== null) blankRanges.push([runStart, sec - 1])
    runStart = null
  }
  if (prevSig !== null && Math.abs(mean - prevSig) < 0.05 && variance < 0.5) {
    frozen.push(sec)
  }
  prevSig = mean; prevIdx = sec
})
if (runStart !== null) blankRanges.push([runStart, frames.length])

if (blankRanges.length) findings.push(`BLANK/BLACK frame second-ranges: ${JSON.stringify(blankRanges)} — late asset load or conditional rendering nothing`)
if (frozen.length > 3) findings.push(`FROZEN seconds (variance ~0): ${frozen.join(', ')} — every scene needs frame-driven motion`)

fs.rmSync(tmp, { recursive: true, force: true })

console.log(`frames sampled: ${frames.length} (1/s)`)
if (findings.length === 0) {
  console.log('\n✅ QA PASS — duration OK, no blank/frozen ranges, audio checked')
  process.exit(0)
}
console.log('\n❌ QA FINDINGS:')
for (const f of findings) console.log(' - ' + f)
console.log('\nPaste this report back to your agent with prompts/06-qa-fix-loop.md')
process.exit(1)
