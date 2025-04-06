import React from 'react';

const NewFeaturesButton = () => {
  return (
    <div className="flex items-center justify-center pt-7 px-4">
      <button className="flex items-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold py-2 px-4">
          Nouveautés
        </div>
        <span className="text-gray-800 font-medium text-sm sm:text-base py-2 px-4 whitespace-nowrap">
          Fonctionnalités à venir
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default NewFeaturesButton;