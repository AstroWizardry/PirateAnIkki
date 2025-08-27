import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { withConvexProvider } from '../lib/convex';

const AdminPanel: React.FC = () => {
  const userProfile = useQuery(api.users.getCurrentUserProfile);
  const isAdmin = useQuery(api.users.isAdmin);

  // If not authenticated, show sign-in prompt
  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to access admin panel
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to access the admin panel.
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

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have permission to access the admin panel. Only administrators can view this page.
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, Administrator!</h2>
        <p className="text-red-100">
          You have full access to manage the manga library and user accounts.
        </p>
      </div>

      {/* Admin Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            User Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage user accounts, roles, and permissions.
          </p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Manage Users
          </button>
        </div>

        {/* Content Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Content Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add, edit, and manage manga content.
          </p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Manage Content
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View usage statistics and user activity.
          </p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            View Analytics
          </button>
        </div>

        {/* System Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">⚙️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            System Settings
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure system-wide settings and preferences.
          </p>
          <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Settings
          </button>
        </div>

        {/* Backup & Restore */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">💾</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Backup & Restore
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage data backups and system restoration.
          </p>
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            Backup Data
          </button>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-3xl mb-4">🔐</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Security
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Monitor security logs and manage access controls.
          </p>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Security Logs
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">567</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Manga</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">New Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withConvexProvider(AdminPanel);
