import React, { useState } from 'react';
import { useApp } from '../lib/context';
import NSFWWarning from './NSFWWarning';

interface MangaCardInteractiveProps {
  id: string;
  title: string;
  isNSFW?: boolean;
}

const MangaCardInteractive: React.FC<MangaCardInteractiveProps> = ({
  id,
  title,
  isNSFW = false,
}) => {
  const { isNSFWMode } = useApp();
  const [showNSFWWarning, setShowNSFWWarning] = useState(false);

  const handleMangaClick = () => {
    // Check if content is NSFW and user is in SFW mode
    if (isNSFW && !isNSFWMode) {
      setShowNSFWWarning(true);
      return;
    }
    
    window.location.href = `/manga/${id}`;
  };

  const handleContinueToManga = () => {
    setShowNSFWWarning(false);
    window.location.href = `/manga/${id}`;
  };

  const handleCancelNSFW = () => {
    setShowNSFWWarning(false);
  };

  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer transform hover:scale-105 transition-transform duration-200"
        onClick={handleMangaClick}
      >
        {/* This will be replaced by the Astro component content */}
        <slot />
      </div>

      {/* NSFW Warning Modal */}
      {showNSFWWarning && (
        <NSFWWarning
          title="NSFW Content Warning"
          message={`"${title}" contains mature content that may not be suitable for all audiences.`}
          onContinue={handleContinueToManga}
          onCancel={handleCancelNSFW}
        />
      )}
    </>
  );
};

export default MangaCardInteractive; 