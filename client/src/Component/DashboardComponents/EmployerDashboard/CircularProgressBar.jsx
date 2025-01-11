import React from "react";

const CircularProgress = ({ progress, size = 40 }) => {
  const strokeDashoffset = 100 - progress;

  return (
    <div className={`relative w-${size} h-${size}`}>
      <svg
        className="w-full h-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="2"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-blue-600 dark:text-blue-500"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        ></circle>
      </svg>
      {progress !== undefined && (
        <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
