'use client';

import { useEffect, useRef, useState } from 'react';
import type { Photo } from './photo';
import AmbientAudio from './ambient-audio';

export default function Slideshow({ photos, initialIndex, onClose }: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const photo = photos[index % photos.length];
  const move = (direction: number) => setIndex((current) => (current + direction + photos.length) % photos.length);

  useEffect(() => {
    const element = dialog.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    element.showModal();
    return () => {
      element.close();
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    if (!playing || photos.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % photos.length), 4000);
    return () => window.clearInterval(timer);
  }, [playing, photos.length]);

  return <dialog ref={dialog} className="slideshow" aria-label="Photo slideshow"
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={(event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        setPlaying(false);
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <div className="slideshow-toolbar">
      <span>{index % photos.length + 1} / {photos.length}</span>
      <div>
        <AmbientAudio src={photo.audioUrl} />
        {photos.length > 1 && <button onClick={() => setPlaying((current) => !current)} aria-pressed={playing}>
          {playing ? 'Pause' : 'Play'}
        </button>}
        <button onClick={onClose} autoFocus aria-label="Close slideshow">Close ×</button>
      </div>
    </div>
    <div className="slideshow-stage">
      {photos.length > 1 && <button className="slide-arrow previous" aria-label="Previous photo" onClick={() => { setPlaying(false); move(-1); }}>‹</button>}
      {failedUrl === photo.url ? <p role="status">This image could not be loaded.</p> :
        <img key={photo.url} src={photo.url} alt={photo.name} onError={() => setFailedUrl(photo.url)} />}
      {photos.length > 1 && <button className="slide-arrow next" aria-label="Next photo" onClick={() => { setPlaying(false); move(1); }}>›</button>}
    </div>
    <p className="slide-caption" aria-live={playing ? 'off' : 'polite'}>{photo.name}</p>
  </dialog>;
}
