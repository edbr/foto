'use client';

import { useEffect, useRef, useState } from 'react';
import { itinerary } from './itinerary';
import { useLanguage } from './language';
import outlines from './south-america-outline.json';
import type { RouteData } from './driving-route';

const project = ([longitude, latitude]: number[]) => `${(longitude + 85) * 4},${(14 - latitude) * 4}`;
const itineraryPath = itinerary.map((stop) => project([stop.longitude, stop.latitude])).join(' ');

export default function OverviewMap({ route }: { route: RouteData | null }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (interacted) return;
    const timer = window.setTimeout(() => {
      if (!panel.current?.contains(document.activeElement)) setOpen(false);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [interacted]);

  return <aside className={`overview-map ${open ? 'expanded' : ''}`} ref={panel} aria-label={t('South America overview')}
    onPointerDown={() => setInteracted(true)} onFocus={() => setInteracted(true)}>
    <button className="overview-toggle" aria-expanded={open} aria-controls="overview-content" onClick={() => { setInteracted(true); setOpen(!open); }}>
      {t('Overview')} <span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div id="overview-content" hidden={!open}>
      <svg viewBox="0 0 220 284" role="img" aria-label={t('South America with the northeast Brazil route highlighted')}>
        {outlines.map((country) => <path key={country.name} d={country.path} fill={country.brazil ? 'var(--locator-highlight)' : 'var(--locator-land)'} stroke="var(--locator-border)" strokeWidth="0.6" fillRule="evenodd" />)}
        <text x="126" y="103" textAnchor="middle" className="overview-country">{t('Brazil')}</text>
        {route?.features.length ? route.features.map((feature, index) => <polyline key={index} points={feature.geometry.coordinates.map(project).join(' ')} className="overview-route" />)
          : <polyline points={itineraryPath} className="overview-route" />}
        <circle cx={(itinerary[0].longitude + 85) * 4} cy={(14 - itinerary[0].latitude) * 4} r="2.8" fill="var(--locator-route)" stroke="var(--ui-surface)" strokeWidth="1" />
      </svg>
      <p className="overview-caption">Aracaju ↔ Juazeiro do Norte</p>
      <p className="overview-note">{t(route ? 'Driving route' : 'Itinerary overview')}</p>
      <a className="overview-credit" href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>
    </div>
  </aside>;
}
