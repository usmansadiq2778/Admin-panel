/* eslint-disable no-undef */
// export default {
//   plugins: [require("tailwindcss"), require("autoprefixer")],
// };
// postcss.config.js
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    // Other PostCSS plugins can be added here if needed
  ],
};
