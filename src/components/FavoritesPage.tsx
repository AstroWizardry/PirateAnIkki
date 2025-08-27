import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { withConvexProvider } from '../lib/convex';

const FavoritesPage: React.FC = () => {
  const userProfile = useQuery(api.users.getCurrentUserProfile);
  const favoritesItems = useQuery(api.favorites.getUserFavorites);

  // If not authenticated, show sign-in prompt
  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to access your favorites
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your favorite manga collection is waiting for you. Sign in to start building your list.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  // If loading
  if (favoritesItems === undefined) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your favorites...</p>
      </div>
    );
  }

  // If favorites is empty
  if (favoritesItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start building your favorites list by browsing and hearting your favorite manga.
          </p>
          <a
            href="/browse"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Manga
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {favoritesItems.length} favorite manga
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoritesItems.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
              <div className="text-4xl">❤️</div>
              <div className="absolute top-2 right-2 text-red-500 text-2xl">♥</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.mangaId}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Added: {new Date(item.addedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withConvexProvider(FavoritesPage);
