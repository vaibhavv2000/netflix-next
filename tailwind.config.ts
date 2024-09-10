/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: "class",
 content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 theme: {
  extend: {
   screens: {
    xs: "340px",
    mb: "380px",
    sm: "480px"
   },
  },
  fontFamily: {
   "inter": ['Inter',"sans-serif"],
   "lora": ['Lora',"serif"]
  }
 },
 plugins: [],
};