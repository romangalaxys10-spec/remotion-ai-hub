import React from 'react'
import { Composition, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import { video } from './data'

const Palette = video.palette

const SceneShell: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ fps, frame, config: { damping: 200 } })
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateRight: 'clamp' })
  return (
    <div style={{
      flex: 1, background: Palette.bg, color: Palette.text,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', opacity: enter * exit,
    }}>
      {children}
    </div>
  )
}

const Headline: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = spring({ fps, frame, from: 0.9, to: 1, config: { damping: 200 } })
  return (
    <h1 style={{ fontSize: 88, fontWeight: 800, margin: 0, transform: `scale(${scale})`, letterSpacing: '-0.02em' }}>{text}</h1>
  )
}

const SCENES: Array<{ render: React.FC<{ durationInFrames: number }>; headline: string }> = [
  { headline: video.scenes[0].headline, render: ({ durationInFrames }) => (
      <SceneShell durationInFrames={durationInFrames}><Headline text={video.scenes[0].headline} /></SceneShell>
    ) },
  { headline: video.scenes[1].headline, render: ({ durationInFrames }) => {
      const frame = useCurrentFrame()
      return (
        <SceneShell durationInFrames={durationInFrames}>
          <Headline text={video.scenes[1].headline} />
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 32, display: 'flex', gap: 40, marginTop: 40 }}>
            {video.scenes[1].bullets.map((b, i) => {
              const opacity = interpolate(frame - i * 45, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              return <li key={i} style={{ opacity, color: Palette.accent }}>{b}</li>
            })}
          </ul>
        </SceneShell>
      )
    } },
  { headline: video.scenes[2].headline, render: ({ durationInFrames }) => (
      <SceneShell durationInFrames={durationInFrames}><Headline text={video.scenes[2].headline} /></SceneShell>
    ) },
  { headline: video.scenes[3].headline, render: ({ durationInFrames }) => (
      <SceneShell durationInFrames={durationInFrames}>
        <Headline text={video.scenes[3].headline} />
        <p style={{ fontSize: 28, color: Palette.accent, marginTop: 24 }}>prompts/06-qa-fix-loop.md</p>
      </SceneShell>
    ) },
]

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Explainer}
      durationInFrames={video.fps * video.durationSeconds}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  )
}

const Explainer: React.FC = () => {
  let from = 0
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {video.scenes.map((s, i) => {
        const start = from
        from += s.durationInFrames
        const Scene = SCENES[i]?.render ?? SCENES[0].render
        return (
          <Sequence key={i} from={start} durationInFrames={s.durationInFrames}>
            <Scene durationInFrames={s.durationInFrames} />
          </Sequence>
        )
      })}
    </div>
  )
}
