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
  const [lastUpdatedManga, setLastUpdatedManga] = useState<Manga[]>([]);
  const [staffPickManga, setStaffPickManga] = useState<Manga[]>([]);
  const [featuredManga, setFeaturedManga] = useState<Manga[]>([]);
  const [recentlyAddedManga, setRecentlyAddedManga] = useState<Manga[]>([]);
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
        {
          id: '7',
          title: 'Demon Slayer',
          coverImage: 'https://via.placeholder.com/300x400/FF6B9D/FFFFFF?text=Demon+Slayer',
          author: 'Koyoharu Gotouge',
          status: 'completed',
          rating: 4.7,
          chapters: 205,
          genres: ['Action', 'Fantasy', 'Historical'],
          description: 'A young demon slayer fights to save his sister and humanity.',
        },
        {
          id: '8',
          title: 'Jujutsu Kaisen',
          coverImage: 'https://via.placeholder.com/300x400/4A90E2/FFFFFF?text=Jujutsu+Kaisen',
          author: 'Gege Akutami',
          status: 'ongoing',
          rating: 4.6,
          chapters: 250,
          genres: ['Action', 'Supernatural', 'Horror'],
          description: 'A world where cursed spirits and jujutsu sorcerers battle.',
        },
      ];

      setLastUpdatedManga(mockManga.slice(0, 6));
      setStaffPickManga(mockManga.slice(1, 7));
      setFeaturedManga(mockManga.slice(2, 8));
      setRecentlyAddedManga(mockManga.slice(3, 9));
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  New Release
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Jujutsu Kaisen
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90">
                A world where cursed spirits and jujutsu sorcerers battle in an epic supernatural adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
                  Read Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-lg">
                  View Chapters
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center lg:justify-start space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.6/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>250 Chapters</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Action, Supernatural</span>
                </div>
              </div>
            </div>
            
            {/* Cover Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 sm:w-80 lg:w-96 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://via.placeholder.com/400x600/4A90E2/FFFFFF?text=Jujutsu+Kaisen" 
                    alt="Jujutsu Kaisen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg">
                  <div className="text-sm font-semibold">Chapter 250</div>
                  <div className="text-xs text-gray-600">Latest Release</div>
                </div>
              </div>
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

      {/* Last Updated */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Last Updated
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={lastUpdatedManga}
            onMangaClick={handleMangaClick}
            loading={loading}
            size="small"
          />
        </div>
      </section>

      {/* Staff Pick */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Staff Pick
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={staffPickManga}
            onMangaClick={handleMangaClick}
            loading={loading}
            size="large"
          />
        </div>
      </section>

      {/* Featured Manga */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
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
            size="medium"
          />
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Recently Added
            </h2>
            <a
              href="/browse"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm sm:text-base"
            >
              View All →
            </a>
          </div>
          <MangaGrid
            mangas={recentlyAddedManga}
            onMangaClick={handleMangaClick}
            loading={loading}
            size="small"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Pirate An Ikki
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
            A free community-driven manga and doujinshi platform built with modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200 text-lg">
              Learn More
            </button>
          </div>
          <div className="text-sm opacity-75">
            <p className="mb-2">
              Powered by{' '}
              <a 
                href="https://astro.build" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-200 transition-colors duration-200"
              >
                Astro
              </a>
              {' '}and{' '}
              <a 
                href="https://convex.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-200 transition-colors duration-200"
              >
                Convex
              </a>
            </p>
            <p className="text-xs">
              Join our community and contribute to the world's largest free manga collection
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 