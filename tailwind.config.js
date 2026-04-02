/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "#22c55e",
        "accent-dark": "#16a34a",
      },
    },
  },
  plugins: [],
};
