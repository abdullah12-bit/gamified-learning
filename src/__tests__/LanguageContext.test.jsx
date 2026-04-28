import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

function LanguageProbe() {
  const { lang, isArabic, toggleLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="is-arabic">{String(isArabic)}</span>
      <span data-testid="title">{t('map.title')}</span>
      <button type="button" onClick={toggleLanguage}>toggle</button>
    </div>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <LanguageProbe />
    </LanguageProvider>
  );
}

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    document.documentElement.dir = '';
  });

  it('defaults to English and ltr', () => {
    renderProbe();

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('is-arabic')).toHaveTextContent('false');
    expect(screen.getByTestId('title')).toHaveTextContent('Innovation Lab Zones');
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('switches to Arabic, persists the language, and sets rtl', () => {
    renderProbe();

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('lang')).toHaveTextContent('ar');
    expect(screen.getByTestId('is-arabic')).toHaveTextContent('true');
    expect(screen.getByTestId('title')).toHaveTextContent('مناطق مختبر الابتكار');
    expect(localStorage.getItem('taqah_lang')).toBe('ar');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('restores persisted Arabic on first render', () => {
    localStorage.setItem('taqah_lang', 'ar');
    renderProbe();

    expect(screen.getByTestId('lang')).toHaveTextContent('ar');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
