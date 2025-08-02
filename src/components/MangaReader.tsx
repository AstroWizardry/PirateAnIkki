import React, { useState, useEffect } from 'react';

interface MangaPage {
  id: string;
  imageUrl: string;
  pageNumber: number;
}

interface MangaReaderProps {
  pages: MangaPage[];
  onClose: () => void;
}

const MangaReader: React.FC<MangaReaderProps> = ({ pages, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        nextPage();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevPage();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  };

  // Touch handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPage();
    }
    if (isRightSwipe) {
      prevPage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentPage]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls on mobile
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls, currentPage]);

  const handleImageClick = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header Controls */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                aria-label="Close reader"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="text-white text-sm sm:text-base">
                Page {currentPage + 1} of {pages.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        className="flex-1 flex items-center justify-center relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleImageClick}
      >
        {/* Previous Page Area */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            prevPage();
          }}
        />

        {/* Current Page */}
        <div className="max-w-full max-h-full flex items-center justify-center p-4">
          <img
            src={pages[currentPage]?.imageUrl}
            alt={`Page ${currentPage + 1}`}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Next Page Area */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            nextPage();
          }}
        />
      </div>

      {/* Bottom Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Previous page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-32 sm:w-48 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
                />
              </div>
              <span className="text-white text-sm sm:text-base min-w-[60px] text-center">
                {currentPage + 1}/{pages.length}
              </span>
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Next page"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Instructions */}
      {!showControls && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm opacity-0 animate-pulse">
            Tap to show controls
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaReader; 