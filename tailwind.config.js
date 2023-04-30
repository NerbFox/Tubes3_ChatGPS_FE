/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "GREEN-100": "rgba(163, 255, 227, 0.5)",
        "GREEN-200": "#A3FFE3",
        "GREEN-400": "#57FFCD",
        "GREEN-600": "#3DB390",
        GREY: "#D9D9D9",
      },
      boxShadow: {
        "algo-highlight": "0 -2px 2px 0 #2B7F66, 0 2px 2px 0 #2B7F66",
        history: "0 2px 12px 0 #2B7F66",
        "text-field":
          "-2px 0 2px 0 rgba(43, 127, 102, 0.45), 2px 0 2px 0 rgba(43, 127, 102, 0.45), 0 2px 2px 0 rgba(43, 127, 102, 0.45), 0 -2px 2px 0 rgba(43, 127, 102, 0.45)",
      },
    },
  },
  plugins: [],
};
