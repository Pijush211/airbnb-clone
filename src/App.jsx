import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PropertyHeader from './components/PropertyHeader';
import HeroGallery from './components/HeroGallery';
import ListingDetails from './components/ListingDetails';
import ReserveCard from './components/ReserveCard';
import PhotoTour from './components/PhotoTour';
import Lightbox from './components/Lightbox';
import ShareModal from './components/ShareModal';
import AmenitiesModal from './components/AmenitiesModal';
import { listingData } from './data/listingData';

export default function App() {
  const [viewMode, setViewMode] = useState('listing'); // 'listing' | 'tour' | 'lightbox'
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [previousView, setPreviousView] = useState('listing');
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);

  // Initialize saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`saved_${listingData.id}`);
    if (saved === 'true') {
      setIsSaved(true);
    }
  }, []);

  const handleToggleSave = () => {
    setIsSaved(prev => {
      const next = !prev;
      localStorage.setItem(`saved_${listingData.id}`, String(next));
      return next;
    });
  };

  const openTour = () => {
    setPreviousView(viewMode);
    setViewMode('tour');
  };

  const openLightbox = (index = 0) => {
    setPreviousView(viewMode);
    setActivePhotoIndex(index);
    setViewMode('lightbox');
  };

  const closeLightbox = () => {
    if (previousView === 'tour') {
      setViewMode('tour');
    } else {
      setViewMode('listing');
    }
  };

  const heroPhotos = listingData.heroPhotoIndices.map((idx) => ({
    ...listingData.photos[idx],
    originalIndex: idx
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Top Global Navigation */}
      <Header />

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-10 pb-20">
        {/* Title, Save, Share */}
        <PropertyHeader
          title={listingData.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* 5-Photo Hero Collage */}
        <HeroGallery
          heroPhotos={heroPhotos}
          onOpenPhotoTour={openTour}
          onOpenLightbox={(idx) => openLightbox(idx)}
        />

        {/* Main Content: 2 Columns */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Details) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ListingDetails
              data={listingData}
              onOpenAmenitiesModal={() => setIsAmenitiesOpen(true)}
            />
          </div>

          {/* Right Column (Reservation & Discount Widget) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ReserveCard data={listingData} />
          </div>
        </div>
      </main>

      {/* 2. Photo Tour Overlay View */}
      {viewMode === 'tour' && (
        <PhotoTour
          categories={listingData.categories}
          photos={listingData.photos}
          onClose={() => setViewMode('listing')}
          onOpenLightbox={(idx) => {
            setPreviousView('tour');
            setActivePhotoIndex(idx);
            setViewMode('lightbox');
          }}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onOpenShare={() => setIsShareOpen(true)}
        />
      )}

      {/* 3. Lightbox Overlay View */}
      {viewMode === 'lightbox' && (
        <Lightbox
          photos={listingData.photos}
          currentIndex={activePhotoIndex}
          onIndexChange={setActivePhotoIndex}
          onClose={closeLightbox}
          onBackToTour={() => setViewMode('tour')}
        />
      )}

      {/* Auxiliary Modals */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        listing={listingData}
      />

      <AmenitiesModal
        isOpen={isAmenitiesOpen}
        onClose={() => setIsAmenitiesOpen(false)}
        amenities={listingData.amenities}
      />
    </div>
  );
}
