
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      <span className="ml-4 text-lg text-gray-400">Loading Data...</span>
    </div>
  );
};

export default Loader;
