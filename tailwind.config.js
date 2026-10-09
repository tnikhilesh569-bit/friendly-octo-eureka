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
          bg: "#F7F0EC", // Soft Rose-Gold Champagne Background
          card: "#FDF8F5", // Lighter Glass Card
          primary: "#E2B8A8", // Rose Gold Primary Accent
          accent: "#D49B86", // Deep Rose Accent
          text: "#4A3B32", // Elegant Dark Brown/Rose Text
          muted: "#8C7A70",
        },
      },
      boxShadow: {
        neumorphic: "12px 12px 24px #e3d5cd, -12px -12px 24px #ffffff",
        "neumorphic-inset": "inset 6px 6px 12px #e3d5cd, inset -6px -6px 12px #ffffff",
        glass: "0 8px 32px 0 rgba(226, 184, 168, 0.2)",
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};
