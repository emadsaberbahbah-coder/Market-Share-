
import React from 'react';

interface HeaderProps {
  onRefresh: () => void;
  lastUpdated: string | null;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, lastUpdated, isLoading }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pb-4 border-b border-gray-700">
      <div>
        <h1 className="text-3xl font-bold text-cyan-400">Tadawul Financial Tracker</h1>
        <p className="text-sm text-gray-400 mt-1">
          Market data dashboard {lastUpdated && `(Last updated: ${lastUpdated})`}
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75"
      >
        <svg
          className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h5M20 20v-5h-5M20 4l-4 4M4 20l4-4M12 2v2m0 16v2m8-10h-2M4 12H2m15.364 7.364l-1.414-1.414M6.05 6.05l-1.414-1.414m13.314 0l-1.414 1.414M6.05 17.95l-1.414 1.414"
          />
        </svg>
        {isLoading ? 'Refreshing...' : 'Refresh All'}
      </button>
    </header>
  );
};

export default Header;
