import { useState, useEffect } from 'react';
import '../styles/ScrollToTop.css';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId = null;
    let isScheduled = false;

    const toggleVisibility = () => {
      const shouldBeVisible = window.scrollY > 400;
      setIsVisible(shouldBeVisible);
      isScheduled = false;
    };

    const handleScroll = () => {
      if (!isScheduled) {
        isScheduled = true;
        rafId = requestAnimationFrame(toggleVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
          type="button"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
