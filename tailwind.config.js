
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        background: "#0B090E",
        surface: "#17131D",
        elevated: "#211B27",

        primary: "#F472B6",
        "primary-dark": "#DB4F98",

        foreground: "#F8F5F9",
        muted: "#A69AAA",
        border: "#302837",

        success: "#4ADE80",
        warning: "#FBBF24",
        danger: "#FB7185",
      },

      fontFamily: {
        sans: ["PlusJakartaSans"],
      },

      borderRadius: {
        card: "18px",
        button: "16px",
      },
    },
  },

  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: ["./src/**/*.{js,jsx,ts,tsx}"],
//     presets: [require("nativewind/preset")],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   };