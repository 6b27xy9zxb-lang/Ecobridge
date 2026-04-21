/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          green:    "#00FF87",
          teal:     "#00C9A7",
          dark:     "#0A0F0D",
          card:     "#111812",
          border:   "#1E2E24",
          muted:    "#4B6B55",
          white:    "#F0FFF4",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse at 50% 0%, #00FF8722 0%, transparent 70%)",
        "card-glow": "radial-gradient(ellipse at 50% 0%, #00C9A711 0%, transparent 80%)",
      }
    },
  },
  plugins: [],
}