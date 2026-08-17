/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#F5F2E9", alt: "#FAF8F5", inverse: "#2A2825" },
        ink: {
          primary: "#3D372E",
          secondary: "#5D574E",
          muted: "#8A847A",
          inverse: "#F5F2E9",
        },
        line: { DEFAULT: "#D3C5B3", focus: "#5D574E" },
        accent: { DEFAULT: "#1A1A1A", hover: "#333333" },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
