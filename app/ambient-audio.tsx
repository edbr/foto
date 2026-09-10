'use client';

import { useEffect, useRef, useState } from 'react';

type Track = { audio: HTMLAudioElement; retiring: boolean };

export default function AmbientAudio({ src }: { src?: string }) {
  const tracks = useRef(new Set<Track>());
  const current = useRef<Track | null>(null);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [state, setState] = useState<'ready' | 'blocked' | 'error'>('ready');

  useEffect(() => {
    let frame: number;
    let previous = performance.now();
    const tick = (now: number) => {
      const step = Math.min(now - previous, 100) / 800 * 0.35;
      previous = now;
      for (const track of tracks.current) {
        const target = track.retiring || mutedRef.current ? 0 : 0.35;
        track.audio.volume = Math.max(0, Math.min(0.35, track.audio.volume + Math.sign(target - track.audio.volume) * Math.min(step, Math.abs(target - track.audio.volume))));
        if (track.retiring && track.audio.volume === 0) {
          track.audio.pause();
          track.audio.removeAttribute('src');
          track.audio.load();
          tracks.current.delete(track);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      for (const { audio } of tracks.current) {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      }
      tracks.current.clear();
    };
  }, []);

  useEffect(() => {
    setState('ready');
    if (!src) { current.current = null; return; }
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    const track = { audio, retiring: false };
    tracks.current.add(track);
    current.current = track;
    const onError = () => { if (!track.retiring) setState('error'); };
    audio.addEventListener('error', onError);
    void audio.play().catch((error: DOMException) => {
      if (!track.retiring) setState(error.name === 'NotAllowedError' ? 'blocked' : 'error');
    });
    return () => {
      track.retiring = true;
      audio.removeEventListener('error', onError);
    };
  }, [src]);

  if (!src) return null;
  return <>
    <button disabled={state === 'error'} aria-pressed={!muted && state === 'ready'} onClick={() => {
      if (state === 'blocked') {
        const track = current.current;
        void track?.audio.play().then(() => {
          if (!track.retiring) setState('ready');
        }).catch(() => { if (!track?.retiring) setState('error'); });
      } else {
        mutedRef.current = !muted;
        setMuted(!muted);
      }
    }}>{state === 'error' ? 'Audio unavailable' : state === 'blocked' ? 'Enable sound' : muted ? 'Unmute' : 'Mute'}</button>
  </>;
}
