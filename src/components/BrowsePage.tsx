import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MangaGrid from './MangaGrid';

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
  count?: number;
}

const BrowsePage: React.FC = () => {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [filteredMangas, setFilteredMangas] = useState<Manga[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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

    setFilteredMangas(filtered);
  }, [mangas, selectedGenres, selectedStatuses, searchQuery]);

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

        {/* Search and Filter Summary */}
        {(selectedGenres.length > 0 || selectedStatuses.length > 0 || searchQuery) && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedGenres.map(genreId => {
                const genre = genres.find(g => g.id === genreId);
                return (
                  <span key={genreId} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full">
                    {genre?.label}
                  </span>
                );
              })}
              {selectedStatuses.map(statusId => {
                const status = statuses.find(s => s.id === statusId);
                return (
                  <span key={statusId} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 rounded-full">
                    {status?.label}
                  </span>
                );
              })}
              <button
                onClick={handleClearFilters}
                className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Sidebar
              genres={genres}
              statuses={statuses}
              selectedGenres={selectedGenres}
              selectedStatuses={selectedStatuses}
              onGenreChange={handleGenreChange}
              onStatusChange={handleStatusChange}
              onClearFilters={handleClearFilters}
            />
          </div>

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
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
                <select className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="latest">Latest Updated</option>
                  <option value="title">Title A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Manga Grid */}
            <MangaGrid
              mangas={filteredMangas}
              onMangaClick={handleMangaClick}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage; 