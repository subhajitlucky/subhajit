import { useState, useEffect } from 'react';

function resolveInitialTheme() {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
      return savedTheme === 'space';
    }
  }
  
  if (typeof document !== 'undefined') {
    return document.body?.getAttribute('data-theme') === 'space';
  }
  
  return false;
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
