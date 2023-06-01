/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#173753",
        "mid-blue": "#1D70A2",
      },
    },
  },
  plugins: [],
};
