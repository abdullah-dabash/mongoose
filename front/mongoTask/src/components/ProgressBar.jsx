import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div className="text-xs font-medium text-gray-600">{progress}%</div>
      </div>
      <div className="flex">
        <div
          className="w-full bg-gray-200 h-2 rounded"
          style={{ backgroundColor: '#e5e7eb' }}
        >
          <div
            className="h-2 rounded bg-green-500"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
