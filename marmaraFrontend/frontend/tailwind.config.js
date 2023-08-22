/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral": "FCFDFF",
        "accent": "FF8D4F",
        "primary": {
          100: "#0B3160",
          200: "#6B8AB2",
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
