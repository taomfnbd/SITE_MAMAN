/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': 'var(--color-paper)', // Bleu Ardoise profond
        'charcoal': 'var(--color-charcoal)', // Texte clair (Coquille d'oeuf)
        'charcoal-light': 'var(--color-charcoal-light)', // Correction du code couleur invalide
        'clay': 'var(--color-clay)', // Beige/Doré délavé
        'sage': 'var(--color-sage)', // Fond secondaire sombre
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.03\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
