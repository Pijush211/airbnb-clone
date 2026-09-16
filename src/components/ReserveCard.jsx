import React, { useState } from 'react';

export default function ReserveCard({ data }) {
  const [nights, setNights] = useState(data.defaultNights || 5);
  const [guests, setGuests] = useState(2);
  const [discountClaimed, setDiscountClaimed] = useState(false);
  const [reserved, setReserved] = useState(false);

  const basePrice = data.pricePerNight * nights;
  const discountAmount = discountClaimed ? Math.round(basePrice * 0.1) : 0;
  const cleaningFee = data.cleaningFee;
  const serviceFee = data.serviceFee;
  const totalPrice = basePrice - discountAmount + cleaningFee + serviceFee;

  return (
    <div className="sticky top-28 space-y-4">
      {/* 10% Discount Promo Banner */}
      <div className="border border-neutral-200 rounded-2xl p-4 bg-white shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              Get 10% off your next stay.
            </p>
            <p className="text-xs text-neutral-500 underline cursor-pointer">
              Terms apply.
            </p>
          </div>
        </div>
        <button
          onClick={() => setDiscountClaimed(true)}
          disabled={discountClaimed}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            discountClaimed
              ? 'bg-neutral-100 text-neutral-400 cursor-default'
              : 'border border-neutral-900 text-neutral-900 hover:bg-neutral-100 active:scale-95'
          }`}
        >
          {discountClaimed ? 'Claimed' : 'Claim'}
        </button>
      </div>

      {/* Main Reservation Card */}
      <div className="border border-neutral-200 rounded-2xl p-6 bg-white shadow-card space-y-5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">
              ₹{basePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-neutral-500 text-sm ml-1.5 font-normal">
              for {nights} nights
            </span>
          </div>
          <div className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
            <span>★ {data.rating}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500 underline">{data.reviewCount} reviews</span>
          </div>
        </div>

        {/* Date and Guest Selection Box */}
        <div className="border border-neutral-400 rounded-xl overflow-hidden text-xs">
          <div className="grid grid-cols-2 divide-x divide-neutral-400 border-b border-neutral-400">
            <div className="p-2.5 hover:bg-neutral-50 cursor-pointer">
              <label className="font-extrabold text-neutral-800 block text-[10px] tracking-wider uppercase">
                Check-in
              </label>
              <input
                type="date"
                defaultValue="2026-10-01"
                className="w-full bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer text-xs"
              />
            </div>
            <div className="p-2.5 hover:bg-neutral-50 cursor-pointer">
              <label className="font-extrabold text-neutral-800 block text-[10px] tracking-wider uppercase">
                Checkout
              </label>
              <input
                type="date"
                defaultValue="2026-10-06"
                className="w-full bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer text-xs"
              />
            </div>
          </div>
          <div className="p-2.5 hover:bg-neutral-50 flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-extrabold text-neutral-800 block text-[10px] tracking-wider uppercase">
                Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer text-xs"
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reserve Button */}
        <button
          onClick={() => setReserved(true)}
          className="w-full py-3.5 bg-gradient-to-r from-airbnb-gradientStart to-airbnb-gradientEnd hover:opacity-95 text-white font-semibold rounded-xl text-base shadow-md transition-transform active:scale-[0.98]"
        >
          {reserved ? "Reservation Requested!" : "Reserve"}
        </button>

        <p className="text-center text-xs text-neutral-500 font-normal">
          You won't be charged yet
        </p>

        {/* Cost Breakdown */}
        <div className="space-y-3 text-sm text-neutral-700 border-t border-neutral-200 pt-4">
          <div className="flex justify-between">
            <span className="underline">₹{data.pricePerNight.toLocaleString('en-IN')} x {nights} nights</span>
            <span>₹{basePrice.toLocaleString('en-IN')}</span>
          </div>

          {discountClaimed && (
            <div className="flex justify-between text-emerald-700 font-medium">
              <span className="underline">10% special discount</span>
              <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>₹{serviceFee.toLocaleString('en-IN')}</span>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold text-neutral-900 text-base">
            <span>Total before taxes</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
