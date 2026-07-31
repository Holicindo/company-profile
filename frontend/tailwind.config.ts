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
