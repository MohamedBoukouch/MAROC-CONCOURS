export const darkMode = 'class';
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./public/index.html"
];
export const theme = {
  extend: {
    fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
    },
    colors: {
      primary: {
        600: '#2563eb',
      },
    },
  },
};
export const plugins = [];