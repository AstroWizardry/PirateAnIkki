import React from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const AuthButton: React.FC = () => {
  const { signIn, signOut } = useAuthActions();
  const userProfile = useQuery(api.users.getCurrentUserProfile);
  const isAdmin = useQuery(api.users.isAdmin);

  const handleSignIn = () => {
    signIn("convex");
  };

  const handleSignOut = () => {
    signOut();
  };

  // If no user profile exists, show sign in button
  if (!userProfile) {
    return (
      <button
        onClick={handleSignIn}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
        </div>
        {isAdmin && (
          <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
            Admin
          </span>
        )}
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {userProfile?.displayName || 'User'}
          </p>
          {isAdmin && (
            <p className="text-xs text-red-500 font-medium mt-1">
              Administrator
            </p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AuthButton;
