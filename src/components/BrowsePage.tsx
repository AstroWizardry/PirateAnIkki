import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchableTagSelector from './SearchableTagSelector';
import MangaListView from './MangaListView';
import MangaGridView from './MangaGridView';
import MangaIconView from './MangaIconView';
import ViewModeSelector from './ViewModeSelector';
import type { ViewMode } from './ViewModeSelector';

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

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

const BrowsePage: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Mock filter options
  const genres: FilterOption[] = [
    { id: 'action', label: 'Action', count: 1250 },
    { id: 'adventure', label: 'Adventure', count: 980 },
    { id: 'comedy', label: 'Comedy', count: 750 },
    { id: 'drama', label: 'Drama', count: 620 },
    { id: 'fantasy', label: 'Fantasy', count: 890 },
    { id: 'horror', label: 'Horror', count: 340 },
    { id: 'romance', label: 'Romance', count: 680 },
    { id: 'sci-fi', label: 'Sci-Fi', count: 420 },
    { id: 'slice-of-life', label: 'Slice of Life', count: 450 },
    { id: 'supernatural', label: 'Supernatural', count: 560 },
    { id: 'thriller', label: 'Thriller', count: 380 },
    { id: 'sports', label: 'Sports', count: 290 },
    { id: 'psychological', label: 'Psychological', count: 320 },
    { id: 'mystery', label: 'Mystery', count: 280 },
    { id: 'historical', label: 'Historical', count: 190 },
    { id: 'martial-arts', label: 'Martial Arts', count: 450 },
    { id: 'mecha', label: 'Mecha', count: 180 },
    { id: 'music', label: 'Music', count: 120 },
    { id: 'parody', label: 'Parody', count: 90 },
    { id: 'school', label: 'School', count: 520 },
    { id: 'seinen', label: 'Seinen', count: 680 },
    { id: 'shoujo', label: 'Shoujo', count: 420 },
    { id: 'shounen', label: 'Shounen', count: 890 },
    { id: 'josei', label: 'Josei', count: 180 },
    { id: 'ecchi', label: 'Ecchi', count: 240 },
    { id: 'harem', label: 'Harem', count: 310 },
    { id: 'isekai', label: 'Isekai', count: 280 },
    { id: 'magic', label: 'Magic', count: 420 },
    { id: 'military', label: 'Military', count: 150 },
    { id: 'monsters', label: 'Monsters', count: 200 },
    { id: 'ninja', label: 'Ninja', count: 180 },
    { id: 'police', label: 'Police', count: 90 },
    { id: 'post-apocalyptic', label: 'Post-Apocalyptic', count: 120 },
    { id: 'reverse-harem', label: 'Reverse Harem', count: 85 },
    { id: 'samurai', label: 'Samurai', count: 95 },
    { id: 'space', label: 'Space', count: 110 },
    { id: 'superhero', label: 'Superhero', count: 160 },
    { id: 'time-travel', label: 'Time Travel', count: 75 },
    { id: 'vampire', label: 'Vampire', count: 130 },
    { id: 'video-games', label: 'Video Games', count: 95 },
    { id: 'war', label: 'War', count: 85 },
    { id: 'western', label: 'Western', count: 45 },
    { id: 'yuri', label: 'Yuri', count: 120 },
    { id: 'yaoi', label: 'Yaoi', count: 95 },
    { id: 'gender-bender', label: 'Gender Bender', count: 65 },
    { id: 'incest', label: 'Incest', count: 25 },
    { id: 'lolicon', label: 'Lolicon', count: 35 },
    { id: 'shotacon', label: 'Shotacon', count: 30 },
    { id: 'tragedy', label: 'Tragedy', count: 180 },
    { id: 'vampire', label: 'Vampire', count: 130 },
    { id: 'zombies', label: 'Zombies', count: 85 },
  ];

  const statuses: FilterOption[] = [
    { id: 'ongoing', label: 'Ongoing', count: 850 },
    { id: 'completed', label: 'Completed', count: 1200 },
    { id: 'hiatus', label: 'Hiatus', count: 150 },
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockManga: Manga[] = [
        {
          id: '1',
          title: 'One Piece',
          coverImage: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=One+Piece',
          author: 'Eiichiro Oda',
          status: 'ongoing',
          rating: 4.8,
          chapters: 1080,
          genres: ['action', 'adventure', 'comedy'],
          description: 'A legendary pirate adventure spanning decades of storytelling.',
        },
        {
          id: '2',
          title: 'Naruto',
          coverImage: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Naruto',
          author: 'Masashi Kishimoto',
          status: 'completed',
          rating: 4.6,
          chapters: 700,
          genres: ['action', 'adventure', 'fantasy'],
          description: 'The journey of a young ninja seeking to become the strongest.',
        },
        {
          id: '3',
          title: 'Dragon Ball',
          coverImage: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Dragon+Ball',
          author: 'Akira Toriyama',
          status: 'completed',
          rating: 4.7,
          chapters: 519,
          genres: ['action', 'adventure', 'comedy'],
          description: 'Epic battles and martial arts adventures across the universe.',
        },
        {
          id: '4',
          title: 'Bleach',
          coverImage: 'https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Bleach',
          author: 'Tite Kubo',
          status: 'completed',
          rating: 4.5,
          chapters: 686,
          genres: ['action', 'supernatural', 'adventure'],
          description: 'Soul Reapers and supernatural battles in the afterlife.',
        },
        {
          id: '5',
          title: 'My Hero Academia',
          coverImage: 'https://via.placeholder.com/300x400/FFEAA7/FFFFFF?text=My+Hero+Academia',
          author: 'Kohei Horikoshi',
          status: 'ongoing',
          rating: 4.4,
          chapters: 400,
          genres: ['action', 'superhero', 'school'],
          description: 'A world where almost everyone has superpowers.',
        },
        {
          id: '6',
          title: 'Attack on Titan',
          coverImage: 'https://via.placeholder.com/300x400/DDA0DD/FFFFFF?text=Attack+on+Titan',
          author: 'Hajime Isayama',
          status: 'completed',
          rating: 4.9,
          chapters: 139,
          genres: ['action', 'drama', 'horror'],
          description: 'Humanity fights for survival against giant titans.',
        },
        {
          id: '7',
          title: 'Demon Slayer',
          coverImage: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Demon+Slayer',
          author: 'Koyoharu Gotouge',
          status: 'completed',
          rating: 4.7,
          chapters: 205,
          genres: ['action', 'adventure', 'supernatural'],
          description: 'Tanjiro Kamado becomes a demon slayer to save his sister.',
        },
        {
          id: '8',
          title: 'Jujutsu Kaisen',
          coverImage: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Jujutsu+Kaisen',
          author: 'Gege Akutami',
          status: 'ongoing',
          rating: 4.6,
          chapters: 250,
          genres: ['action', 'supernatural', 'horror'],
          description: 'Yuji Itadori joins a secret organization of Jujutsu sorcerers.',
        },
        {
          id: '9',
          title: 'Tokyo Ghoul',
          coverImage: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Tokyo+Ghoul',
          author: 'Sui Ishida',
          status: 'completed',
          rating: 4.3,
          chapters: 143,
          genres: ['action', 'horror', 'supernatural'],
          description: 'A dark tale of humans and flesh-eating ghouls in Tokyo.',
        },
        {
          id: '10',
          title: 'Death Note',
          coverImage: 'https://via.placeholder.com/300x400/96CEB4/FFFFFF?text=Death+Note',
          author: 'Tsugumi Ohba',
          status: 'completed',
          rating: 4.8,
          chapters: 108,
          genres: ['thriller', 'supernatural', 'drama'],
          description: 'A psychological thriller about a notebook that can kill.',
        },
        {
          id: '11',
          title: 'Fullmetal Alchemist',
          coverImage: 'https://via.placeholder.com/300x400/FFEAA7/FFFFFF?text=Fullmetal+Alchemist',
          author: 'Hiromu Arakawa',
          status: 'completed',
          rating: 4.9,
          chapters: 108,
          genres: ['action', 'adventure', 'fantasy'],
          description: 'Two brothers seek to restore their bodies using alchemy.',
        },
        {
          id: '12',
          title: 'Hunter x Hunter',
          coverImage: 'https://via.placeholder.com/300x400/DDA0DD/FFFFFF?text=Hunter+x+Hunter',
          author: 'Yoshihiro Togashi',
          status: 'hiatus',
          rating: 4.7,
          chapters: 400,
          genres: ['action', 'adventure', 'fantasy'],
          description: 'Gon Freecss embarks on a journey to become a Hunter.',
        },
      ];

      setMangas(mockManga);
      setFilteredMangas(mockManga);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = mangas;

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(manga =>
        selectedGenres.some(genre => manga.genres.includes(genre))
      );
    }

    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(manga =>
        selectedStatuses.includes(manga.status)
      );
    }

    // Apply rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(manga => manga.rating >= ratingFilter);
    }

    // Apply chapter filter
    if (chapterFilter !== 'all') {
      switch (chapterFilter) {
        case 'short':
          filtered = filtered.filter(manga => manga.chapters <= 50);
          break;
        case 'medium':
          filtered = filtered.filter(manga => manga.chapters > 50 && manga.chapters <= 200);
          break;
        case 'long':
          filtered = filtered.filter(manga => manga.chapters > 200);
          break;
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(manga =>
        manga.title.toLowerCase().includes(query) ||
        manga.author.toLowerCase().includes(query) ||
        manga.description.toLowerCase().includes(query) ||
        manga.genres.some(genre => genre.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered = getSortedMangas(filtered);

    setFilteredMangas(filtered);
  }, [mangas, selectedGenres, selectedStatuses, searchQuery, ratingFilter, chapterFilter, sortBy]);

  const handleGenreChange = (genreId: string) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleStatusChange = (statusId: string) => {
    setSelectedStatuses(prev =>
      prev.includes(statusId)
        ? prev.filter(id => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSearchQuery('');
    setRatingFilter(0);
    setChapterFilter('all');
    setSortBy('latest');
  };

  const handleImFeelingLucky = () => {
    if (filteredMangas.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMangas.length);
      const randomManga = filteredMangas[randomIndex];
      window.location.href = `/manga/${randomManga.id}`;
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const getSortedMangas = (mangas: Manga[]) => {
    switch (sortBy) {
      case 'title':
        return [...mangas].sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return [...mangas].sort((a, b) => b.rating - a.rating);
      case 'chapters':
        return [...mangas].sort((a, b) => b.chapters - a.chapters);
      case 'newest':
        return [...mangas].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default: // latest
        return [...mangas].sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMangaClick = (id: string) => {
    window.location.href = `/manga/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Manga
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Discover and filter through our extensive collection of manga titles
          </p>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {/* Main Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search manga by title, author, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleImFeelingLucky}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>I'm Feeling Lucky</span>
            </button>
            <button
              onClick={handleClearFilters}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Filters</span>
            </button>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {/* Genre and Status Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Genres
                  </label>
                  <SearchableTagSelector
                    tags={genres}
                    selectedTags={selectedGenres}
                    onTagChange={handleGenreChange}
                    onClearAll={() => setSelectedGenres([])}
                    placeholder="Search genres..."
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Status
                  </label>
                  <div className="space-y-2">
                    {statuses.map((status) => (
                      <label key={status.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status.id)}
                          onChange={() => handleStatusChange(status.id)}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({status.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating, Chapter, and Sort Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                      {ratingFilter}+
                    </span>
                  </div>
                </div>

                {/* Chapter Count Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chapter Count
                  </label>
                  <select
                    value={chapterFilter}
                    onChange={(e) => setChapterFilter(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Lengths</option>
                    <option value="short">Short (≤50 chapters)</option>
                    <option value="medium">Medium (51-200 chapters)</option>
                    <option value="long">Long (&gt;200 chapters)</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="latest">Latest Updated</option>
                    <option value="title">Title A-Z</option>
                    <option value="rating">Highest Rated</option>
                    <option value="chapters">Most Chapters</option>
                    <option value="newest">Newest Added</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {loading ? 'Loading...' : `${filteredMangas.length} manga found`}
                </h2>
                {!loading && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Showing results for your search and filters
                  </p>
                )}
              </div>
              
              {/* View Mode Selector */}
              <ViewModeSelector currentMode={viewMode} onModeChange={setViewMode} />
            </div>

            {/* Manga Grid */}
            {viewMode === 'grid' && (
              <MangaGridView
                mangas={filteredMangas}
                onMangaClick={handleMangaClick}
                loading={loading}
              />
            )}
            {viewMode === 'list' && (
              <MangaListView
                mangas={filteredMangas}
                onMangaClick={handleMangaClick}
                loading={loading}
              />
            )}
            {viewMode === 'icon' && (
              <MangaIconView
                mangas={filteredMangas}
                onMangaClick={handleMangaClick}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage; 