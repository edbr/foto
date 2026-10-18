export const site = {
  name: 'Stories',
  url: 'https://travelbrazil.edbelluti.com',
  writeupUrl: 'https://eduardobelluti.com/blog/photography-becomes-data',
  socialImage: '/photos/WhatsApp Image 2026-09-09 at 10.13.04.jpeg',
};

export const person = {
  '@type': 'Person',
  '@id': 'https://eduardobelluti.com/#person',
  name: 'Eduardo Belluti',
  url: 'https://eduardobelluti.com/',
  sameAs: ['https://www.linkedin.com/in/edbelluti/', 'https://github.com/edbr'],
};

export function pageDetails(path: string, language: 'en' | 'pt' = 'en') {
  const trip = path.startsWith('/trips/sertao');
  if (language === 'pt') return trip ? {
    title: 'Pelos caminhos do sertão | Stories | Eduardo Belluti',
    description: 'Explore fotografias, sons e camadas geográficas de Aracaju a Juazeiro do Norte em um mapa interativo criado por Eduardo Belluti.',
  } : {
    title: 'Stories: Fotografia, Mapas e Dados | Eduardo Belluti',
    description: 'Explore histórias de viagem pelo Brasil por meio de fotografias, sons e mapas interativos. Um projeto de design e dados geográficos de Eduardo Belluti.',
  };
  return trip ? {
    title: 'Along the Roads of the Sertão | Stories | Eduardo Belluti',
    description: 'Explore photographs, sounds, and geographic data from Aracaju to Juazeiro do Norte through an interactive map built by Eduardo Belluti.',
  } : {
    title: 'Stories: Photography, Maps & Data | Eduardo Belluti',
    description: 'Explore Brazilian travel stories through photographs, sounds, and interactive maps. A product design and geospatial data project by Eduardo Belluti.',
  };
}
