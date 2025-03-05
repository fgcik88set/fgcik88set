import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainWhite: "#FFFFFF",
        offWhite: "#F5F5F5",
        darkBlue: "#0c347d",
        mainYellow: "#f7e707",
        offBlack: "#121212",

      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        cardShadow: [
          "rgba(17, 17, 26, 0.1) 0px 4px 16px",
          "rgba(17, 17, 26, 0.1) 0px 8px 24px",
          "rgba(17, 17, 26, 0.1) 0px 16px 56px",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
