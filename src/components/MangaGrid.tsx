import React from 'react';
import MangaCard from './MangaCard';

interface Manga {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  chapters: number;
  genres: string[];
  description: string;
}

interface MangaGridProps {
  mangas: Manga[];
  onMangaClick?: (id: string) => void;
  loading?: boolean;
}

const MangaGrid: React.FC<MangaGridProps> = ({
  mangas,
  onMangaClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-3 sm:p-4">
              <div className="h-4 sm:h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="flex gap-1">
                <div className="h-5 w-8 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-8 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-8 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (mangas.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <svg
          className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white">
          No manga found
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
      {mangas.map((manga) => (
        <MangaCard
          key={manga.id}
          {...manga}
          onCardClick={onMangaClick}
        />
      ))}
    </div>
  );
};

export default MangaGrid; 