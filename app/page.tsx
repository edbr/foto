'use client';

import { useLanguage, LanguageSwitch } from './language';

import Link from 'next/link';
import { trips } from './trips';
import RouteChip from './route-chip';
import DestinationSuggestion from './destination-suggestion';

export default function Home() {
  const { t, language } = useLanguage();
  return <main className="home-page" lang={language === 'pt' ? 'pt-BR' : 'en'}>
    <header className="home-header"><Link href="/" className="home-logo">{t("Stories")}<span>.</span></Link><span>{t("Um lugar para cada memória.")}</span><LanguageSwitch /></header>
    <section className="home-intro">
      <p className="home-kicker">{t("CAMINHOS E DESCOBERTAS")}</p>
      <h1>{t("Histórias pelo caminho.")}</h1>
      <p>{t("Fotografias, sons e lugares. Descubra novos caminhos no mapa.")}</p>
    </section>
    <section aria-label={t("Caminhos")} className="trip-grid">
      {trips.map((trip, index) => <Link key={trip.slug} href={`/trips/${trip.slug}`} prefetch={false} className="trip-card">
        <div className="trip-cover"><img src={trip.cover} alt="" /><span className="trip-index">{t("CAMINHO")} {String(index + 1).padStart(2, '0')}</span>
          <RouteChip stops={trip.overviewStops} label={t('South America with the northeast Brazil route highlighted')} />
        </div>
        <div className="trip-info"><p className="trip-region">{t(trip.region)} <span>{trip.route}</span></p>
          <h2>{t(trip.title)}</h2><p className="trip-description">{t(trip.description)}</p>
          <span className="trip-open">{t("Explorar o mapa")} <span aria-hidden="true">↗</span></span>
        </div>
      </Link>)}
    </section>
    <DestinationSuggestion />
    <footer className="home-footer">
      <span><a className="home-credit" href="https://edbelluti.com/">{t("Made by Eduardo")}</a></span>
      <div className="home-footer-links">
        <a href="https://www.instagram.com/dantebelluti/">Instagram ↗</a>
      </div>
    </footer>
  </main>;
}
