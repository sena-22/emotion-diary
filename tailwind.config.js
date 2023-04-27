/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: [
    {
      extend: {
        fontFamily: {
          poor: ["Poor Story"],
        },
      },
    },
  ],
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
}
