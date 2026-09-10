import outlines from './south-america-outline.json';

export default function RouteChip({ stops, label }: {
  stops: { longitude: number; latitude: number }[];
  label: string;
}) {
  const points = stops.map(({ longitude, latitude }) => `${(longitude + 85) * 4},${(14 - latitude) * 4}`).join(' ');
  return <span className="route-chip">
    <svg viewBox="0 0 220 284" role="img" aria-label={label}>
      {outlines.map((country) => <path key={country.name} d={country.path}
        fill={country.brazil ? 'var(--locator-highlight)' : 'var(--locator-land)'} stroke="var(--locator-border)" strokeWidth="1" fillRule="evenodd" />)}
      <polyline points={points} fill="none" stroke="var(--locator-route)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>;
}
