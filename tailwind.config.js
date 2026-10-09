/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          primary: '#4F46E5',
          danger: '#E11D48',
          success: '#10B981',
        }
      },
    },
  },
  plugins: [],
}
