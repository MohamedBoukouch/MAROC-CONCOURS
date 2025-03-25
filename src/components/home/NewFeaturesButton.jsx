import React from 'react';

const NewFeaturesButton = () => {
  return (
    <div className='pt-7'>
      <button className="  flex items-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 p-1 text-1xl">
      <div className="bg-blue-600 text-white rounded-full py-2 px-4 mr-2 ">New</div>
      <span className="text-gray-700 font-medium py-2 px-4">New Features Coming Soon</span>
      <span className="text-gray-700 mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
    </div>
  );
};

export default NewFeaturesButton;