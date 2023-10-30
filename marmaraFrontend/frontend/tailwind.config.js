/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: "#FCFDFF",
        accent: "#FF8D4F",
        primary: {
          100: "#0B3160",
          200: "#6B8AB2",
        },
        darkNeutral: "#10141A",
        darkPrimary: "#1B2430",
        picked: "#186F65",
      },
      keyframes: {
        shake: {
          "0%": { marginLeft: "0rem" },
          "25%": { marginLeft: "0.5rem" },
          "75%": { marginLeft: "-0.5rem" },
          "100%": { marginLeft: "0rem" },
        },
        // Bir şey denemek için oluşturdum bunu ilerde kullanmak
        // isteyebiliriz dursun
        buttonHover: {
          "0%": { left: "-1rem" },
          "100%": { left: "12rem" },
        },
        showFilters: {
          "0%": { height: "0rem" },
          "100%": { height: "70%" },
        },
      },

      animation: {
        shake: "shake 0.2s ease-in-out 0s 2",
        buttonHover: "buttonHover 0.75s ease-in-out infinite",
        showFilters: "showFilters 0.5s forwards",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
