import React, { useEffect } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

export default function Lightbox({
  photos,
  currentIndex,
  onIndexChange,
  onClose,
  onBackToTour
}) {
  const currentPhoto = photos[currentIndex];
  const totalPhotos = photos.length;

  const handlePrev = () => {
    onIndexChange((currentIndex - 1 + totalPhotos) % totalPhotos);
  };

  const handleNext = () => {
    onIndexChange((currentIndex + 1) % totalPhotos);
  };

  // Keyboard navigation
  useKeyboard({
    onLeft: handlePrev,
    onRight: handleNext,
    onEscape: onClose,
    enabled: true
  });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-white flex flex-col select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
    >
      {/* Top Bar */}
      <div className="h-16 border-b border-neutral-200 px-6 flex items-center justify-between flex-shrink-0 bg-white">
        {/* Left: 9-dots Grid icon (Return to Photo Tour) */}
        <button
          onClick={onBackToTour}
          className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800"
          title="Return to photo tour"
          aria-label="Return to photo tour"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16">
            <circle cx="2.5" cy="2.5" r="1.5" />
            <circle cx="8" cy="2.5" r="1.5" />
            <circle cx="13.5" cy="2.5" r="1.5" />
            <circle cx="2.5" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="13.5" cy="8" r="1.5" />
            <circle cx="2.5" cy="13.5" r="1.5" />
            <circle cx="8" cy="13.5" r="1.5" />
            <circle cx="13.5" cy="13.5" r="1.5" />
          </svg>
        </button>

        {/* Center: Current Category Title */}
        <div className="text-sm font-semibold text-neutral-900 tracking-tight">
          {currentPhoto.category}
        </div>

        {/* Right: Counter and Close 'X' */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-neutral-600">
            {currentIndex + 1} of {totalPhotos}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800"
            aria-label="Close photo viewer"
          >
            <svg className="w-5 h-5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Center Image Stage */}
      <div className="flex-1 relative flex items-center justify-center p-6 bg-white overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 z-10 w-12 h-12 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-airbnb border border-neutral-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Previous photo (Left Arrow key)"
        >
          <svg className="w-5 h-5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Image Container */}
        <div className="max-w-[85vw] max-h-[80vh] flex flex-col items-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.caption || `${currentPhoto.category} photo ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-sm transition-opacity duration-150 animate-in fade-in"
          />
          {currentPhoto.caption && (
            <p className="mt-3 text-xs text-neutral-500 text-center max-w-xl line-clamp-2">
              {currentPhoto.caption}
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-6 z-10 w-12 h-12 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-airbnb border border-neutral-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Next photo (Right Arrow key)"
        >
          <svg className="w-5 h-5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
