module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A", // Black
        accent: "#00FF88", // Neon Green
        secondary: "#1A1A1A", // Dark Gray
      },
      fontFamily: {
        spaceMono: ["Space Mono", "monospace"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};