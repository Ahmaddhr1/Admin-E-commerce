/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors:{
      red:'#d90f0f'
     },
     fontFamily:{
       poppins:['Poppins','sans-serif'],
       outfit:['Outfit','sans-serif'],
       poppins:['Poppins','sans-serif'],
     }
    },
  },
  plugins: [],
};
