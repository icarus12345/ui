const animate = require("tailwindcss-animate")
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ['variant', '.dark'],
  // safelist: ["dark"],
  content: [
    "./components/**/*.{vue,ts}",
    "./composables/**/*.{vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{ts}",
    "./utils/**/*.{ts}",

    "./@ui/**/*.{vue,ts}",

    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      borderRadius: {
      	xl: "calc(var(--radius) + 0.4rem)",
        lg: "calc(var(--radius) + 0.2rem)",
        md: "calc(var(--radius))",
        sm: "calc(var(--radius) - 0.2rem)",
        DEFAULT: '0.6rem',
      },
      fontFamily: {
        sans: 'Google Sans'
      },
      ringOffsetWidth: {
        0: '0.0rem',
        1: '0.1rem',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
      ringWidth: {
        DEFAULT: '0.2rem',
        0: '0.0rem',
        1: '0.1rem',
        2: '0.2rem',
        4: '0.4rem',
        8: '0.8rem',
      },
      spacing: {
        px: '1px',
        0: '0px',
        0.5: '0.2rem',
        1: '0.4rem',
        1.5: '0.6rem',
        2: '0.8rem',
        2.5: '1.0rem',
        3: '1.2rem',
        3.5: '1.4rem',
        4: '1.6rem',
        5: '2.0rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4rem',
        11: '4.4rem',
        12: '4.8rem',
        14: '5.6rem',
        16: '6.4rem',
        20: '8.0rem',
        24: '8.8rem',
        28: '11.2rem',
        32: '12.8rem',
        36: '14.4rem',
        40: '16rem',
        44: '17.6rem',
        48: '19.2rem',
        52: '20.8rem',
        56: '22.4rem',
        60: '24.0rem',
        64: '25.6rem',
        72: '28.8rem',
        80: '32.0rem',
        96: '38.4rem',
      },
      fontSize: {
        xxs: ['0.8rem', { lineHeight: '1.25' }],
        xs: ['1.0rem', { lineHeight: '1.2' }],
        sm: ['1.15rem', { lineHeight: '1.2173913' }],
        base: ['1.3rem', { lineHeight: '1.23076923' }],
        md: ['1.45rem', { lineHeight: '1.24137931' }],
        lg: ['1.6rem', { lineHeight: '1.25' }],
        xl: ['1.8rem', { lineHeight: '1.22222222' }],
      },
      maxWidth: {
        xs: 'min(32rem, calc(100dvw - 3.2rem))',
        sm: 'min(40rem, calc(100dvw - 3.2rem))',
        md: 'min(48rem, calc(100dvw - 3.2rem))',
        lg: 'min(56rem, calc(100dvw - 3.2rem))',
        xl: 'min(64rem, calc(100dvw - 3.2rem))',
      },
    },
  },
  plugins: [
    animate,
    plugin(function({ addBase }) {
      addBase({
        ':root': { fontSize: "10px", lineHeight: "1.23076923" },
        // 'html': { fontSize: "13px" },
      })
    }),
  ],
}
