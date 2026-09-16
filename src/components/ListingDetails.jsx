import React, { useState } from 'react';

export default function ListingDetails({ data, onOpenAmenitiesModal }) {
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div className="space-y-8 text-neutral-800">
      {/* Property Subtitle & Capacity */}
      <div className="border-b border-neutral-200 pb-6">
        <h2 className="text-[22px] font-semibold text-neutral-900 tracking-tight">
          {data.type}
        </h2>
        <p className="text-neutral-600 text-base mt-1">
          {data.stats}
        </p>
      </div>

      {/* Guest Favourite Box */}
      <div className="border border-neutral-200 rounded-2xl p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Laurel Wreath */}
          <div className="flex items-center gap-1 text-neutral-900">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 1 1 12 4V2zm-4.95 5.05A6 6 0 0 0 6 12a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4 4 4 0 0 1 .76-2.35l-1.71-1.6z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight">Guest</span>
              <span className="font-bold text-lg leading-tight tracking-tight">favourite</span>
            </div>
            <svg className="w-8 h-8 fill-current scale-x-[-1]" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 1 1 12 4V2zm-4.95 5.05A6 6 0 0 0 6 12a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4 4 4 0 0 1 .76-2.35l-1.71-1.6z" />
            </svg>
          </div>
          <div className="text-sm text-neutral-700 font-medium max-w-[220px] leading-snug">
            {data.badgeText}
          </div>
        </div>

        <div className="flex items-center divide-x divide-neutral-200 text-center">
          <div className="px-6">
            <div className="text-xl font-bold text-neutral-900">{data.rating}</div>
            <div className="flex items-center justify-center gap-0.5 text-xs text-neutral-800 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
          <div className="px-6">
            <div className="text-xl font-bold text-neutral-900">{data.reviewCount}</div>
            <div className="text-xs underline font-semibold text-neutral-800 mt-0.5">Reviews</div>
          </div>
        </div>
      </div>

      {/* Host summary */}
      <div className="border-b border-neutral-200 pb-6 flex items-center gap-4">
        <img
          src={data.host.avatar}
          alt={data.host.name}
          className="w-14 h-14 rounded-full object-cover border border-neutral-200"
        />
        <div>
          <h3 className="font-semibold text-neutral-900 text-base">
            Hosted by {data.host.name}
          </h3>
          <p className="text-neutral-500 text-sm">
            {data.host.badge} · {data.host.tenure}
          </p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="border-b border-neutral-200 pb-6 space-y-5">
        {data.highlights.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="mt-1 text-neutral-900">
              {item.id === 'jacuzzi' && (
                <svg className="w-6 h-6 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <path d="M3 12h18M3 16h18M6 8h12M12 4v4"></path>
                </svg>
              )}
              {item.id === 'workspace' && (
                <svg className="w-6 h-6 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              )}
              {item.id === 'self-checkin' && (
                <svg className="w-6 h-6 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <circle cx="7.5" cy="15.5" r="5.5"></circle>
                  <path d="m21 2-9.6 9.6"></path>
                  <path d="m15.5 7.5 3 3"></path>
                </svg>
              )}
              {item.id === 'cancellation' && (
                <svg className="w-6 h-6 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 text-base">{item.title}</h4>
              <p className="text-neutral-500 text-sm mt-0.5 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description text */}
      <div className="border-b border-neutral-200 pb-6">
        <div className={`text-neutral-700 text-base leading-relaxed whitespace-pre-line ${!descExpanded ? 'line-clamp-4' : ''}`}>
          {data.description}
        </div>
        <button
          onClick={() => setDescExpanded(!descExpanded)}
          className="mt-3 font-semibold underline text-neutral-900 flex items-center gap-1 hover:text-black"
        >
          {descExpanded ? 'Show less' : 'Show more'}
          <span>&gt;</span>
        </button>
      </div>

      {/* Sleeping arrangement */}
      <div className="border-b border-neutral-200 pb-6">
        <h3 className="text-[20px] font-semibold text-neutral-900 mb-4">
          Where you'll sleep
        </h3>
        <div className="border border-neutral-200 rounded-xl p-6 w-52 space-y-3">
          <svg className="w-6 h-6 stroke-neutral-800 stroke-2" fill="none" viewBox="0 0 24 24">
            <path d="M2 4v16"></path>
            <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
            <path d="M2 17h20"></path>
            <path d="M6 8v9"></path>
          </svg>
          <div>
            <div className="font-semibold text-neutral-900 text-base">{data.sleepingArrangement.room}</div>
            <div className="text-sm text-neutral-500">{data.sleepingArrangement.bed}</div>
          </div>
        </div>
      </div>

      {/* Amenities Preview */}
      <div className="border-b border-neutral-200 pb-6">
        <h3 className="text-[20px] font-semibold text-neutral-900 mb-4">
          What this place offers
        </h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-lg">🛁</span>
            <span>Private hot tub / jacuzzi</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">🏊‍♂️</span>
            <span>Shared outdoor pool</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">🍳</span>
            <span>Kitchen & cooking basics</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">📶</span>
            <span>Fast wifi (150+ Mbps)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">💻</span>
            <span>Dedicated workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">🚗</span>
            <span>Free parking on premises</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">📺</span>
            <span>43" HDTV with Netflix</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">❄️</span>
            <span>Air conditioning & ceiling fan</span>
          </div>
        </div>

        <button
          onClick={onOpenAmenitiesModal}
          className="mt-6 border border-neutral-900 text-neutral-900 px-6 py-3 rounded-lg font-medium text-sm hover:bg-neutral-100 transition-colors"
        >
          Show all 32 amenities
        </button>
      </div>

      {/* Reviews Section */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">★</span>
          <h3 className="text-[22px] font-semibold text-neutral-900">
            {data.rating} · {data.reviewCount} reviews
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {data.reviews.map((rev) => (
            <div key={rev.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">{rev.name}</h4>
                  <p className="text-xs text-neutral-500">{rev.date}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
