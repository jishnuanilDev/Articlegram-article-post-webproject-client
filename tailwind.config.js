/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('https://coloredbrain.com/wp-content/uploads/2016/07/login-background.jpg')",
      }
    },
  },
  plugins: [nextui(), flowbite.plugin(),],
}



