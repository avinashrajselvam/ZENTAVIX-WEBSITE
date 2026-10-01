import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Immediately reveal visible elements on mount/navigation
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px 80px 0px' }
    );

    elements.forEach((el) => {
      // If already in viewport on page load, make visible immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}
