/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        blackHanSans: ["'Black Han Sans'", "sans-serif"],
        notoSansKR: ["'Noto Sans KR'", "sans-serif"],
        protestGuerrilla: ["'Protest Guerrilla'", "cursive"],
        beaufort: ["Beaufort", "serif"],
      },
      screens: {
        xs: "425px",
      },
    },
    mode: "jit",
  },
  plugins: [],
};
