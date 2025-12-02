// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        solar: {
          light: '#FFD700',
          primary: '#FBBF24',
          dark: '#D97706',
          accent: '#F59E0B',
          text: '#1F2937',
          background: '#F3F4F6'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}