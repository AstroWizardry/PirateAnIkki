import React, { useState, useEffect } from 'react';
import MangaReader from './MangaReader';

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

interface Chapter {
  id: string;
  title: string;
  number: number;
  date: string;
  pages: number;
}

interface MangaDetailPageProps {
  mangaId: string;
}

const MangaDetailPage: React.FC<MangaDetailPageProps> = ({ mangaId }) => {
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReader, setShowReader] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockManga: Manga = {
        id: mangaId,
        title: 'One Piece',
        coverImage: 'https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=One+Piece',
        author: 'Eiichiro Oda',
        status: 'ongoing',
        rating: 4.8,
        chapters: 1080,
        genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy'],
        description: 'Follow the epic journey of Monkey D. Luffy and his pirate crew as they search for the legendary One Piece treasure. Set in a world where pirates roam the seas, this story explores themes of friendship, freedom, and the pursuit of dreams. With over 1000 chapters, One Piece has become one of the most beloved and longest-running manga series of all time.',
      };

      const mockChapters: Chapter[] = [
        { id: '1', title: 'Romance Dawn', number: 1, date: '2024-01-15', pages: 45 },
        { id: '2', title: 'They Call Him Straw Hat Luffy', number: 2, date: '2024-01-22', pages: 42 },
        { id: '3', title: 'Enter Zoro', number: 3, date: '2024-01-29', pages: 44 },
        { id: '4', title: 'Morgan vs Luffy', number: 4, date: '2024-02-05', pages: 41 },
        { id: '5', title: 'The King of the Pirates', number: 5, date: '2024-02-12', pages: 43 },
        { id: '6', title: 'First Friend', number: 6, date: '2024-02-19', pages: 40 },
        { id: '7', title: 'The Legend Begins', number: 7, date: '2024-02-26', pages: 46 },
        { id: '8', title: 'Nami', number: 8, date: '2024-03-05', pages: 42 },
        { id: '9', title: 'The Devil Fruit', number: 9, date: '2024-03-12', pages: 44 },
        { id: '10', title: 'The Strongest Swordsman', number: 10, date: '2024-03-19', pages: 41 },
      ];

      setManga(mockManga);
      setChapters(mockChapters);
      setLoading(false);
    }, 1000);
  }, [mangaId]);

  const handleReadChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setShowReader(true);
  };

  const handleCloseReader = () => {
    setShowReader(false);
    setSelectedChapter(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'hiatus':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
              </div>
              <div className="lg:w-2/3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Manga not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The manga you're looking for doesn't exist.
          </p>
          <a
            href="/browse"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Manga
          </a>
        </div>
      </div>
    );
  }

  // Mock pages for the reader
  const mockPages = selectedChapter ? Array.from({ length: selectedChapter.pages }, (_, i) => ({
    id: `${selectedChapter.id}-${i + 1}`,
    imageUrl: `https://via.placeholder.com/800x1200/333/FFF?text=Page+${i + 1}`,
    pageNumber: i + 1,
  })) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a
            href="/browse"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Browse
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Manga Info */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          {/* Cover Image */}
          <div className="lg:w-1/3">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src={manga.coverImage}
                alt={manga.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Manga Details */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {/* Title and Status */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {manga.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      manga.status
                    )}`}
                  >
                    {manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {manga.chapters} chapters
                  </span>
                </div>
              </div>

              {/* Author */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Author
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{manga.author}</p>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Rating
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(manga.rating)}</div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {manga.rating.toFixed(1)}/5.0
                  </span>
                </div>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {manga.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {manga.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => handleReadChapter(chapters[0])}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Start Reading
                </button>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-semibold">
                  Add to Library
                </button>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-semibold">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Chapters ({chapters.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{chapter.date}</span>
                      <span>•</span>
                      <span>{chapter.pages} pages</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReadChapter(chapter)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Manga Reader */}
      {showReader && selectedChapter && (
        <MangaReader
          pages={mockPages}
          onClose={handleCloseReader}
        />
      )}
    </div>
  );
};

export default MangaDetailPage; 