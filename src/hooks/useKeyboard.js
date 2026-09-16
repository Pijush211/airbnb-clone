import { useEffect } from 'react';

export function useKeyboard({ onLeft, onRight, onEscape, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Don't trigger when user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowLeft' && onLeft) {
        e.preventDefault();
        onLeft();
      } else if (e.key === 'ArrowRight' && onRight) {
        e.preventDefault();
        onRight();
      } else if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLeft, onRight, onEscape, enabled]);
}
