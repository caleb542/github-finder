/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "main",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
   // daisyUI config (optional)
   daisyui: {
    themes: [
      {
       
      },
      "dark",
      "cupcake",
    ],
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    lightTheme: "cupcake"
  },
  plugins: [require("daisyui")],
}
