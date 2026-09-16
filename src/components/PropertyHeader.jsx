import React from 'react';

export default function PropertyHeader({ title, isSaved, onToggleSave, onOpenShare }) {
  return (
    <div className="pt-6 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <h1 className="text-[26px] font-semibold tracking-tight text-neutral-900 leading-snug">
        {title}
      </h1>

      <div className="flex items-center gap-4 text-sm font-medium">
        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 underline decoration-solid decoration-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          <span>Share</span>
        </button>

        {/* Save Button */}
        <button
          onClick={onToggleSave}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 underline decoration-solid decoration-neutral-800 transition-colors"
          aria-label={isSaved ? "Remove from saved list" : "Save this property"}
        >
          <svg
            className={`w-4 h-4 transition-colors ${
              isSaved ? "fill-airbnb-red stroke-airbnb-red" : "fill-transparent stroke-neutral-800 stroke-2"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
