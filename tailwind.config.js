module.exports = {
  purge: ["./components//*.{js,ts,jsx,tsx}", "./pages//*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
