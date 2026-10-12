/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./cheat-sheety/**/*.{md,mdx}",
    "./checklisty/**/*.{md,mdx}",
    "./kurzy/**/*.{md,mdx}",
    "./haxing/**/*.{md,mdx}",
    "./newsletter-archiv/**/*.{md,mdx}",
    "./tym/**/*.{md,mdx}",
    "./zranitelnosti/**/*.{md,mdx}",
    "./docusaurus.config.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ffba00",
          dark: "#e6a700",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts with Infima
    container: false, // Disable Tailwind's container to avoid conflicts with Docusaurus container
  },
};
