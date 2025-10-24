import { useState, useEffect } from 'react';

function resolveInitialTheme() {
  if (typeof document === 'undefined') {
    return false;
  }

  return document.body?.getAttribute('data-theme') === 'space';
}

function useSpaceTheme() {
  const [isSpaceTheme, setIsSpaceTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    const target = typeof document !== 'undefined' ? document.body : null;

    if (!target) {
      return undefined;
    }

    const checkTheme = () => {
      const theme = target.getAttribute('data-theme');
      setIsSpaceTheme(theme === 'space');
    };

    if (typeof MutationObserver === 'undefined') {
      checkTheme();
      return undefined;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    checkTheme();

    return () => observer.disconnect();
  }, []);

  return isSpaceTheme;
}

export default useSpaceTheme;
