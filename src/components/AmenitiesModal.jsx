import React from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

export default function AmenitiesModal({ isOpen, onClose, amenities }) {
  useKeyboard({
    onEscape: onClose,
    enabled: isOpen
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-airbnb border border-neutral-200">
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-800"
            aria-label="Close modal"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold text-neutral-900">What this place offers</h3>
          <div className="w-8" />
        </div>

        <div className="p-6 overflow-y-auto space-y-8 divide-y divide-neutral-100">
          {amenities.map((cat, i) => (
            <div key={i} className={i > 0 ? "pt-6" : ""}>
              <h4 className="font-bold text-neutral-900 mb-3">{cat.category}</h4>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-neutral-700 text-sm">
                    <span className="text-neutral-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
