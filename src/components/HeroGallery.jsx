import React from 'react';

export default function HeroGallery({ heroPhotos, onOpenPhotoTour, onOpenLightbox }) {
  const p0 = heroPhotos[0];
  const p1 = heroPhotos[1];
  const p2 = heroPhotos[2];
  const p3 = heroPhotos[3];
  const p4 = heroPhotos[4];

  return (
    <div className="relative mt-2 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[440px]">
        {/* Left main hero (col-span-2) */}
        <div
          onClick={() => onOpenLightbox(p0.originalIndex)}
          className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden bg-neutral-100"
        >
          <img
            src={p0.url}
            alt={p0.caption || "Hero property view"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
          />
        </div>

        {/* Middle column (2 stacked photos) */}
        <div className="hidden md:flex flex-col gap-2 h-full">
          <div
            onClick={() => onOpenLightbox(p1.originalIndex)}
            className="h-1/2 relative cursor-pointer group overflow-hidden bg-neutral-100"
          >
            <img
              src={p1.url}
              alt={p1.caption || "Property view 2"}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
            />
          </div>
          <div
            onClick={() => onOpenLightbox(p2.originalIndex)}
            className="h-1/2 relative cursor-pointer group overflow-hidden bg-neutral-100"
          >
            <img
              src={p2.url}
              alt={p2.caption || "Property view 3"}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right column (2 stacked photos + Show All Photos button) */}
        <div className="hidden md:flex flex-col gap-2 h-full relative">
          <div
            onClick={() => onOpenLightbox(p3.originalIndex)}
            className="h-1/2 relative cursor-pointer group overflow-hidden bg-neutral-100"
          >
            <img
              src={p3.url}
              alt={p3.caption || "Property view 4"}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
            />
          </div>
          <div
            onClick={() => onOpenLightbox(p4.originalIndex)}
            className="h-1/2 relative cursor-pointer group overflow-hidden bg-neutral-100"
          >
            <img
              src={p4.url}
              alt={p4.caption || "Property view 5"}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
            />
          </div>

          {/* "Show all photos" floating button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenPhotoTour();
            }}
            className="absolute bottom-5 right-5 bg-white/95 hover:bg-white text-neutral-900 px-3.5 py-1.5 rounded-lg border border-neutral-900 shadow-md flex items-center gap-2 text-sm font-medium transition-transform active:scale-95 z-10"
            aria-label="Show all 43 photos in photo tour"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
              <circle cx="2" cy="2" r="1.5" />
              <circle cx="8" cy="2" r="1.5" />
              <circle cx="14" cy="2" r="1.5" />
              <circle cx="2" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="14" cy="8" r="1.5" />
              <circle cx="2" cy="14" r="1.5" />
              <circle cx="8" cy="14" r="1.5" />
              <circle cx="14" cy="14" r="1.5" />
            </svg>
            <span>Show all photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
