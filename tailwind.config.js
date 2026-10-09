/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lumi: {
          bg: '#F7F0EC',
          card: '#FDF8F5',
          primary: '#E2B8A8',
          accent: '#D49B86',
          text: '#4A3B32',
          muted: '#8C7A70',
        }
      },
      boxShadow: {
        neumorphic: '8px 8px 16px #d5ccc6, -8px -8px 16px #ffffff',
        'neumorphic-inset': 'inset 4px 4px 8px #d5ccc6, inset -4px -4px 8px #ffffff',
        'rose-gold': '6px 6px 12px #d0a696, -6px -6px 12px #ffdac0',
      }
    },
  },
  plugins: [],
};
