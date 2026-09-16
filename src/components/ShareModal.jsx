import React, { useState } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

export default function ShareModal({ isOpen, onClose, listing }) {
  const [copied, setCopied] = useState(false);

  useKeyboard({
    onEscape: onClose,
    enabled: isOpen
  });

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-airbnb border border-neutral-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-800"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center text-neutral-900 mb-6">
          Share this place
        </h3>

        {/* Property preview card */}
        <div className="flex items-center gap-4 border border-neutral-200 rounded-xl p-3 mb-6">
          <img
            src={listing.photos[0]?.url}
            alt={listing.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm text-neutral-900 line-clamp-1">{listing.title}</h4>
            <p className="text-xs text-neutral-500">{listing.type}</p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3 text-sm font-medium">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>🔗</span>
            <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
          <button
            onClick={() => window.open(`mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(window.location.href)}`)}
            className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>✉️</span>
            <span>Email</span>
          </button>
          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(listing.title + ' - ' + window.location.href)}`)}
            className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(listing.title)}&url=${encodeURIComponent(window.location.href)}`)}
            className="flex items-center gap-3 p-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <span>🐦</span>
            <span>Twitter / X</span>
          </button>
        </div>
      </div>
    </div>
  );
}
