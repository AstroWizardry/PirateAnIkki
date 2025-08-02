import React, { useEffect } from 'react';
import { useApp } from '../lib/context';

const ModeToggles: React.FC = () => {
  const { isDarkMode, setIsDarkMode, isNSFWMode, setIsNSFWMode } = useApp();

  // Debug logging
  useEffect(() => {
    console.log('ModeToggles - Current state:', { isDarkMode, isNSFWMode });
  }, [isDarkMode, isNSFWMode]);

  const toggleDarkMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle dark mode clicked, current:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const toggleNSFWMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle NSFW mode clicked, current:', isNSFWMode);
    setIsNSFWMode(!isNSFWMode);
  };

  return (
    <>
      {/* Desktop Mode Toggles */}
      <div className="hidden sm:flex items-center space-x-2">
        {/* NSFW/SFW Toggle */}
        <button
          type="button"
          onClick={toggleNSFWMode}
          className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
            isNSFWMode 
              ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
              : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
          } hover:opacity-80`}
          title={isNSFWMode ? 'NSFW Mode (Click to disable)' : 'SFW Mode (Click to enable NSFW)'}
        >
          <span className="text-lg">
            {isNSFWMode ? '😈' : '😇'}
          </span>
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Mode Toggles */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Content Mode:
          </span>
          <button
            type="button"
            onClick={toggleNSFWMode}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
              isNSFWMode 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
            }`}
          >
            {isNSFWMode ? '😈 NSFW' : '😇 SFW'}
          </button>
        </div>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 cursor-pointer"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default ModeToggles; 