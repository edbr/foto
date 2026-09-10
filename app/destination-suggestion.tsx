'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useLanguage } from './language';

export default function DestinationSuggestion() {
  const { t, language } = useLanguage();
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !destination.trim()) return;
    submitting.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: destination.trim(), language }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setDestination('');
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  return <section className="destination-suggestion" aria-labelledby="suggestion-heading">
    <div>
      <p>{t('Where should the next story begin?')}</p>
      <h2 id="suggestion-heading">{t('Suggest the next destination')}</h2>
    </div>
    <form onSubmit={submit} aria-busy={status === 'sending'}>
      <label htmlFor="suggested-destination">{t('Destination')}</label>
      <div className="suggestion-fields">
        <input id="suggested-destination" name="destination" value={destination}
          onChange={(event) => { setDestination(event.target.value); setStatus('idle'); }}
          placeholder={t('A place worth discovering…')} required minLength={2} maxLength={200}
          disabled={status === 'sending'} autoComplete="off" />
        <button type="submit" disabled={status === 'sending' || destination.trim().length < 2}>
          {status === 'sending' ? t('Sending…') : t('Send')} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="suggestion-status" role="status" aria-live="polite">
        {status === 'sent' ? t('Thank you! Your suggestion has been sent.') : status === 'error' ? t('Could not send your suggestion. Please try again later.') : ''}
      </p>
    </form>
  </section>;
}
