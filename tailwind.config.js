// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Make sure to scan all relevant files
    ],
    theme: {
      extend: {
        fontFamily: {
          oswald: ['Oswald', 'sans-serif'], // Add the Oswald font here
        },
      },
    },
    plugins: [],
  };
  