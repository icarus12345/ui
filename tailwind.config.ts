const { blackA, mauve } = require('@radix-ui/colors')
const green = {
  green1: "#fbfefc",
  green2: "#f4fbf6",
  green3: "#e6f6eb",
  green4: "#d6f1df",
  green5: "#c4e8d1",
  green6: "#adddc0",
  green7: "#8eceaa",
  green8: "#5bb98b",
  green9: "#30a46c",
  green10: "#2b9a66",
  green11: "#218358",
  green12: "#193b2d",
};
const grass = {
  grass1: "#fbfefb",
  grass2: "#f5fbf5",
  grass3: "#e9f6e9",
  grass4: "#daf1db",
  grass5: "#c9e8ca",
  grass6: "#b2ddb5",
  grass7: "#94ce9a",
  grass8: "#65ba74",
  grass9: "#46a758",
  grass10: "#3e9b4f",
  grass11: "#2a7e3b",
  grass12: "#203c25",
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...green,
        ...grass,
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}
