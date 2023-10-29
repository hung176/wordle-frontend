import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wl-gray": "#787c7e",
        "wl-green": "#6aaa64",
        "wl-yellow": "#c9b458",
      },
    },
  },
  plugins: [],
};
export default config;
