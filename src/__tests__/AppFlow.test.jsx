import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { LanguageProvider } from '../context/LanguageContext';

function renderApp() {
  return render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

async function reachMap() {
  fireEvent.click(screen.getByRole('button', { name: /start mission/i }));
  await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  await waitFor(() => expect(screen.getByText(/your mission/i)).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  await waitFor(() => expect(screen.getByRole('button', { name: /begin journey/i })).toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: /begin journey/i }));
  await waitFor(() => expect(screen.getByRole('heading', { name: /innovation lab zones/i })).toBeInTheDocument());
}

describe('TaqahQuest core learner flow', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    document.documentElement.dir = '';
  });

  it('moves from welcome to story to map to lesson to activity', async () => {
    renderApp();

    expect(screen.getByRole('heading', { name: /restore power/i })).toBeInTheDocument();

    await reachMap();

    fireEvent.click(screen.getByRole('button', { name: /circuit basics/i }));
    await waitFor(() => expect(screen.getByText(/i can explain what a complete circuit/i)).toBeInTheDocument());
    expect(screen.getByText(/UAE Link/i)).toBeInTheDocument();
    expect(screen.getByText(/Masdar City uses efficient lighting loops/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student action/i)).toHaveTextContent('Build');

    fireEvent.click(screen.getByRole('button', { name: /start activity/i }));
    await waitFor(() => expect(screen.getByRole('heading', { name: /simple circuit/i })).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /test circuit/i })).toBeInTheDocument();
  });

  it('switches to Arabic without resetting progress', async () => {
    renderApp();
    await reachMap();
    fireEvent.click(screen.getByRole('button', { name: /circuit basics/i }));

    await waitFor(() => expect(screen.getAllByText(/Masdar Lighting Zone/i).length).toBeGreaterThan(0));

    fireEvent.click(screen.getByRole('button', { name: /language: english/i }));

    await waitFor(() => expect(document.documentElement.lang).toBe('ar'));
    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getAllByText(/منطقة إضاءة مصدر/).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /العودة إلى الخريطة/ })).toBeInTheDocument();
  });
});
