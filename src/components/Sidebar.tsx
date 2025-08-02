import React, { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface SidebarProps {
  genres: FilterOption[];
  statuses: FilterOption[];
  selectedGenres: string[];
  selectedStatuses: string[];
  onGenreChange: (genreId: string) => void;
  onStatusChange: (statusId: string) => void;
  onClearFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  genres,
  statuses,
  selectedGenres,
  selectedStatuses,
  onGenreChange,
  onStatusChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-20 left-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
        aria-label="Toggle filters"
      >
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full overflow-y-auto p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Close filters"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Clear Filters */}
          {(selectedGenres.length > 0 || selectedStatuses.length > 0) && (
            <div className="mb-6">
              <button
                onClick={onClearFilters}
                className="w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition-colors duration-200 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Status Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Status
            </h3>
            <div className="space-y-3">
              {statuses.map((status) => (
                <label
                  key={status.id}
                  className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.id)}
                    onChange={() => onStatusChange(status.id)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {status.label}
                  </span>
                  {status.count !== undefined && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {status.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Genres
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {genres.map((genre) => (
                <label
                  key={genre.id}
                  className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => onGenreChange(genre.id)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {genre.label}
                  </span>
                  {genre.count !== undefined && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {genre.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Sort By
            </h3>
            <select className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200">
              <option value="latest">Latest Updated</option>
              <option value="title">Title A-Z</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar; 