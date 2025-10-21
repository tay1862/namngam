import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pink palette
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Rococo (warm cream/beige) palette
        rococo: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f0e8',
          300: '#ebe3d5',
          400: '#d9ccb9',
          500: '#c7b299',
          600: '#b09478',
          700: '#8f7256',
          800: '#6b5440',
          900: '#4a3929',
        },
      },
      fontFamily: {
        lao: ['Noto Sans Lao', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
