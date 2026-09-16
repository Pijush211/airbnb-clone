import React, { useEffect, useRef, useState } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

export default function PhotoTour({
  categories,
  photos,
  onClose,
  onOpenLightbox,
  isSaved,
  onToggleSave,
  onOpenShare
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  const containerRef = useRef(null);

  // Close on Escape
  useKeyboard({
    onEscape: onClose,
    enabled: true
  });

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const elem = document.getElementById(`tour-section-${categoryId}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
    >
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Back to listing"
          >
            <svg className="w-5 h-5 stroke-neutral-800 stroke-2" fill="none" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-base font-semibold text-neutral-900">
            Photo tour
          </h2>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenShare}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Share listing"
            >
              <svg className="w-5 h-5 stroke-neutral-800 stroke-2" fill="none" viewBox="0 0 24 24">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
            <button
              onClick={onToggleSave}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label={isSaved ? "Remove from saved" : "Save listing"}
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  isSaved ? "fill-airbnb-red stroke-airbnb-red" : "fill-transparent stroke-neutral-800 stroke-2"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation Bar */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex flex-col items-start gap-2 flex-shrink-0 group text-left pb-1 border-b-2 transition-all ${
                  isActive ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'
                }`}
              >
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={cat.thumbnail}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <span className={`text-xs font-semibold max-w-[96px] truncate ${
                  isActive ? 'text-neutral-900 font-bold' : 'text-neutral-600'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Content Sections */}
      <div className="max-w-[1120px] mx-auto px-6 py-10 space-y-16">
        {categories.map((category) => {
          const categoryPhotos = category.photoIndices.map(idx => ({
            ...photos[idx],
            originalIndex: idx
          }));

          const primaryPhoto = categoryPhotos[0];
          const remainingPhotos = categoryPhotos.slice(1);

          return (
            <section
              key={category.id}
              id={`tour-section-${category.id}`}
              className="scroll-mt-48 space-y-6"
            >
              {/* Category Header */}
              <div className="space-y-1 border-b border-neutral-100 pb-3">
                <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                  {category.name}
                </h3>
                {category.features && (
                  <p className="text-sm text-neutral-600">
                    {category.features}
                  </p>
                )}
              </div>

              {/* Photos Grid */}
              <div className="space-y-4">
                {/* Large Featured Photo */}
                {primaryPhoto && (
                  <div
                    onClick={() => onOpenLightbox(primaryPhoto.originalIndex)}
                    className="w-full h-[480px] rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer relative group"
                  >
                    <img
                      src={primaryPhoto.url}
                      alt={primaryPhoto.caption || category.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-200"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                )}

                {/* Sub-grid of remaining photos */}
                {remainingPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {remainingPhotos.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onOpenLightbox(p.originalIndex)}
                        className="h-[300px] rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer relative group"
                      >
                        <img
                          src={p.url}
                          alt={p.caption || category.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-200"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
