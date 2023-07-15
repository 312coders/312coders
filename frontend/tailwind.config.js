/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  /*
    this is used for dynamic classes:
    https://stackoverflow.com/questions/70093133/add-dynamic-tailwind-class-to-a-react-component-next-js-tailwind-ts
  */
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow)-(300|400|500)/,
    }
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#173753",
        "mid-blue": "#1D70A2",
        "light-blue": "#6DAEDB",
      },
    },
  },
  plugins: [],
};
