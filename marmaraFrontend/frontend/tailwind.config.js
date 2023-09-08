/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      keyframes: {
        shake: {
          "0%": { marginLeft: "0rem" },
          "25%": { marginLeft: "0.5rem" },
          "75%": { marginLeft: "-0.5rem" },
          "100%": { marginLeft: "0rem" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideOut: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        shake: "shake 0.2s ease-in-out 0s 2",
        slideIn: "slideIn 200ms ease-in",
        slideOut: "slideOut 1200ms ease-out",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
