// Approximate place coordinates for the user's trip, not photo GPS metadata.
export const itinerary = [
  { name: 'Aracaju', state: 'SE', leg: 'Ida', longitude: -37.0731, latitude: -10.9472 },
  { name: 'Propriá', state: 'SE', leg: 'Ida', longitude: -36.8403, latitude: -10.2111 },
  { name: 'Paulo Afonso', state: 'BA', leg: 'Ida', longitude: -38.2192, latitude: -9.4078 },
  { name: 'Glória', state: 'BA', leg: 'Ida', longitude: -38.257, latitude: -9.3438 },
  { name: 'Brejo do Burgo', state: 'BA', leg: 'Ida', longitude: -38.49, latitude: -9.30 },
  { name: 'Raso da Catarina', state: 'BA', leg: 'Ida', longitude: -38.55, latitude: -9.65 },
  { name: 'Floresta', state: 'PE', leg: 'Ida', longitude: -38.5686, latitude: -8.6011 },
  { name: 'Salgueiro', state: 'PE', leg: 'Ida', longitude: -39.1192, latitude: -8.0742 },
  { name: 'Juazeiro do Norte', state: 'CE', leg: 'Ida', longitude: -39.3153, latitude: -7.2131 },
  { name: 'Petrolina', state: 'PE', leg: 'Volta', longitude: -40.507, latitude: -9.3891 },
  { name: 'Juazeiro', state: 'BA', leg: 'Volta', longitude: -40.5008, latitude: -9.4111 },
  { name: 'Canudos', state: 'BA', leg: 'Volta', longitude: -39.0261, latitude: -9.8967 },
  { name: 'Jeremoabo', state: 'BA', leg: 'Volta', longitude: -38.3519, latitude: -10.075 },
  { name: 'Aracaju', state: 'SE', leg: 'Volta', longitude: -37.0731, latitude: -10.9472 },
];

export const tripBounds: [[number, number], [number, number]] = [[-40.9, -11.3], [-36.5, -6.85]];

// Room to explore the trip's states (BA, SE, PE, CE) and nearby areas.
export const tripRegionBounds: [[number, number], [number, number]] = [[-46.8, -18.7], [-34.5, -2.5]];
