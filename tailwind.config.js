
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        titel: ["Oswald", "sans-serif"], // Exemple de police personnalisée
      },
      colors: {
        primary: {
          600: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}