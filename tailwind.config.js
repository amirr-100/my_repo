/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': {
          DEFAULT: '#0891b2',
          dark: '#0e7490',
          light: '#22d3ee',
        },
        'tropical-green': {
          DEFAULT: '#059669',
          dark: '#047857',
          light: '#34d399',
        },
        'gold': {
          DEFAULT: '#ca8a04',
          dark: '#a16207',
          light: '#fbbf24',
        },
        'soft-white': '#fafafa',
        'off-white': '#f5f5f5',
        'dark-text': '#1f2937',
        'gray-text': '#6b7280',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
}
