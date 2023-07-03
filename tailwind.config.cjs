/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        radial:
          "radial-gradient(at 77% 38%, rgb(110, 231, 183) 0, transparent 37%), radial-gradient(at 68% 20%,rgb(255, 150, 227) 0, transparent 77%), radial-gradient(at 83% 36%, rgb(243, 232, 255) 0, transparent 33%), radial-gradient(at 18% 27%, transparent, transparent 29%), radial-gradient(at 78% 44%, transparent, transparent 4%), radial-gradient(at 64% 27%, transparent, transparent 44%)",
      }),
      colors: {
        gray: {
          100: "#eff2f6",
          200: "#e3e8ef",
          300: "#cdd5df",
          400: "#9aa4b2",
          500: "#697586",
          600: "#4b5565",
          700: "#364152",
          800: "#202939",
          900: "#121926",
        },
      },
      keyframes: {
        slideUpAndFade: {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideDownAndFade:
          "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideRightAndFade:
          "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
