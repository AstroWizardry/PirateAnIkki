import React, { useState, useEffect } from 'react';
import MangaGrid from './MangaGrid';
import Header from './Header';

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

const HomePage: React.FC = () => {
  const [featuredManga, setFeaturedManga] = useState<Manga[]>([]);
  const [recentManga, setRecentManga] = useState<Manga[]>([]);
  const [popularManga, setPopularManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

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
          genres: ['Action', 'Adventure', 'Comedy'],
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
          genres: ['Action', 'Adventure', 'Fantasy'],
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
          genres: ['Action', 'Adventure', 'Comedy'],
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
          genres: ['Action', 'Supernatural', 'Adventure'],
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
          genres: ['Action', 'Superhero', 'School'],
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
          genres: ['Action', 'Drama', 'Horror'],
          description: 'Humanity fights for survival against giant titans.',
        },
      ];

      setFeaturedManga(mockManga.slice(0, 6));
      setRecentManga(mockManga.slice(1, 7));
      setPopularManga(mockManga.slice(2, 8));
      setLoading(false);
    }, 1000);
  }, []);

  const handleMangaClick = (id: string) => {
    window.location.href = `/manga/${id}`;
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Discover Amazing Manga
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto opacity-90">
              Read thousands of manga titles, from classic series to the latest releases, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
                Start Reading
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-lg">
                Browse Library
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10K+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Manga Titles
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                1M+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Active Readers
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                500K+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Chapters
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                24/7
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Manga */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Manga
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={featuredManga}
            onMangaClick={handleMangaClick}
            loading={loading}
          />
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Recent Updates
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={recentManga}
            onMangaClick={handleMangaClick}
            loading={loading}
          />
        </div>
      </section>

      {/* Popular Manga */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Popular Manga
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={popularManga}
            onMangaClick={handleMangaClick}
            loading={loading}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Reading?
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            Join millions of readers and discover your next favorite manga series.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 