import React from 'react';

interface MangaCardProps {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  rating: number;
  chapters: number;
  genres: string[];
  description: string;
  onCardClick?: (id: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const MangaCard: React.FC<MangaCardProps> = ({
  id,
  title,
  coverImage,
  author,
  status,
  rating,
  chapters,
  genres,
  description,
  onCardClick,
  size = 'medium',
}) => {
  const handleMangaClick = (id: string) => {
    window.location.href = `/manga/${id}`;
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
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className={`${styles.starSize} text-yellow-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className={`${styles.starSize} text-yellow-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className={`${styles.starSize} text-gray-300 dark:text-gray-600`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const getCardStyles = () => {
    switch (size) {
      case 'small':
        return {
          coverWidth: 'w-16 sm:w-20',
          titleSize: 'text-sm font-semibold',
          authorSize: 'text-xs',
          ratingSize: 'text-xs',
          chaptersSize: 'text-xs',
          genreSize: 'text-xs',
          descriptionSize: 'text-xs',
          descriptionLines: 'line-clamp-2',
          padding: 'p-2 sm:p-3',
          badgeSize: 'text-xs px-1 py-0.5',
          starSize: 'w-2.5 h-2.5 sm:w-3 sm:h-3',
          genreCount: 3,
        };
      case 'large':
        return {
          coverWidth: 'w-32 sm:w-40',
          titleSize: 'text-lg sm:text-xl font-bold',
          authorSize: 'text-sm sm:text-base',
          ratingSize: 'text-sm',
          chaptersSize: 'text-sm sm:text-base',
          genreSize: 'text-sm',
          descriptionSize: 'text-sm sm:text-base',
          descriptionLines: 'line-clamp-5',
          padding: 'p-4 sm:p-6',
          badgeSize: 'text-sm px-2 py-1',
          starSize: 'w-4 h-4 sm:w-5 sm:h-5',
          genreCount: 6,
        };
      default: // medium
        return {
          coverWidth: 'w-24 sm:w-32',
          titleSize: 'text-base sm:text-lg font-bold',
          authorSize: 'text-xs sm:text-sm',
          ratingSize: 'text-xs',
          chaptersSize: 'text-xs sm:text-sm',
          genreSize: 'text-xs sm:text-sm',
          descriptionSize: 'text-sm sm:text-base',
          descriptionLines: 'line-clamp-4',
          padding: 'p-3 sm:p-4',
          badgeSize: 'text-xs px-1.5 py-0.5',
          starSize: 'w-3 h-3 sm:w-4 sm:h-4',
          genreCount: 5,
        };
    }
  };

  const styles = getCardStyles();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer transform hover:scale-105 transition-transform duration-200"
      onClick={() => handleMangaClick(id)}
    >
      <div className="flex">
        {/* Cover Image - Dynamic Size */}
        <div className={`relative ${styles.coverWidth} flex-shrink-0`}>
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Status Badge */}
            <div className="absolute top-1 left-1">
              <span
                className={`inline-flex items-center rounded-full font-medium ${styles.badgeSize} ${getStatusColor(
                  status
                )}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            {/* Rating Badge */}
            <div className="absolute top-1 right-1">
              <div className={`bg-black bg-opacity-75 text-white rounded-full font-medium flex items-center space-x-0.5 ${styles.badgeSize}`}>
                <span>{rating.toFixed(1)}</span>
                <svg className={`${styles.starSize} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Dynamic Sizing */}
        <div className={`flex-1 ${styles.padding}`}>
          {/* Title */}
          <h3 className={`${styles.titleSize} text-gray-900 dark:text-white mb-1 line-clamp-2`}>
            {title}
          </h3>

          {/* Author */}
          <p className={`${styles.authorSize} text-gray-600 dark:text-gray-400 mb-2`}>
            by {author}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex space-x-0.5">
              {renderStars(rating)}
            </div>
            <span className={`ml-1 ${styles.ratingSize} text-gray-500 dark:text-gray-400`}>
              ({rating.toFixed(1)})
            </span>
          </div>

          {/* Chapters */}
          <p className={`${styles.chaptersSize} text-gray-600 dark:text-gray-400 mb-2`}>
            {chapters} chapters
          </p>

          {/* Genres - Dynamic Count */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {genres.slice(0, styles.genreCount).map((genre, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 ${styles.genreSize} bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full font-medium`}
              >
                {genre}
              </span>
            ))}
            {genres.length > styles.genreCount && (
              <span className={`inline-block px-2 py-1 ${styles.genreSize} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full`}>
                +{genres.length - styles.genreCount}
              </span>
            )}
          </div>

          {/* Description - Dynamic Lines */}
          <p className={`${styles.descriptionSize} text-gray-600 dark:text-gray-300 ${styles.descriptionLines} leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MangaCard; 