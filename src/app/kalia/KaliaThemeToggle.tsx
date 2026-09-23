'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'kalia-theme';
const EVENT = 'kalia-theme-change';
type Theme = 'dark' | 'light';

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.kaliaTheme === 'light' ? 'light' : 'dark';
}

function getServerSnapshot(): Theme {
  return 'dark';
}

export function KaliaThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.kaliaTheme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the toggle still works for this page view */
    }
    window.dispatchEvent(new Event(EVENT));
  }, [theme]);

  return (
    <button
      type="button"
      className="kalia-theme"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '◐ light' : '◑ dark'}
    </button>
  );
}
