import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: { // Metallic Gold Palette
          50: '#FDFBF7', 100: '#F9F4E8', 200: '#F2E5C6', 300: '#EBD49F',
          400: '#E2C172', 500: '#D4AF37', 600: '#B8962E', 700: '#997B34',
          800: '#755C25', 900: '#524017',
        },
        slate: { // Elegant Dark Charcoal Palette
          850: '#1a1f26', 900: '#12161A', 950: '#0d1013',
        },
        brown: { // Warm Espresso Brown Palette (Brand)
          50: '#FAF6F3', 100: '#F2E8E2', 200: '#E4D0C5', 300: '#CEB09E',
          400: '#B08060', 500: '#8C5A3C', 600: '#6B3F25', 700: '#4A2818',
          800: '#3D2010', 900: '#2C1810', 950: '#1A0E08',
        },
        accent: { 400: '#FDE08B', 500: '#D4AF37', 600: '#C5A059' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
