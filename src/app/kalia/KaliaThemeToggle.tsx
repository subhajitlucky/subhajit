'use client';

import { useCallback, useEffect, useLayoutEffect, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'kalia-theme';
const EVENT = 'kalia-theme-change';
type Theme = 'dark' | 'light';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

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

  useIsomorphicLayoutEffect(() => {
    if (
      document.documentElement.dataset.kaliaTheme === 'light' ||
      document.documentElement.dataset.kaliaTheme === 'dark'
    ) {
      return;
    }

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    const next: Theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';

    document.documentElement.dataset.kaliaTheme = next;
    window.dispatchEvent(new Event(EVENT));
  }, []);

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
