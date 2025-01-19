import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {},
      themes: {
        dark: {
          // Mercury
          colors: {
            background: "#08080A", // the page background color
            foreground: "#edecec", // the page text color
            divider: "rgba(255, 255, 255, 0.15)", // used for divider and single line border
            overlay: "#EE0043", // used for modal, popover, etc.
            focus: "#EE0043", // used for focus state outline
            content1: "#1d1a1a", // used for card, modal, popover, etc.
            content2: "#322d2d",
            content3: "#463f3f",
            content4: "#6b6565",

            // brand colors
            default: {
              DEFAULT: "#463F3F",
              foreground: "#c6c3c3", // contrast color 800
              "50": "#1d1a1a",
              "100": "#272323",
              "200": "#322d2d",
              "300": "#403939",
              "400": "#463f3f",
              "500": "#6b6565",
              "600": "#837e7e",
              "700": "#aaa7a7",
              "800": "#c6c3c3",
              "900": "#edecec",
            },
            primary: {
              DEFAULT: "#EE0043",
              foreground: "#fab0c5", // contrast color 800
              "50": "#64001c",
              "100": "#830025",
              "200": "#a90030",
              "300": "#d9003d",
              "400": "#ee0043",
              "500": "#f13369",
              "600": "#f45481",
              "700": "#f78aa9",
              "800": "#fab0c5",
              "900": "#fde6ec",
            },
            secondary: {
              DEFAULT: "#8653D3",
              foreground: "#d9caf1", // contrast color 800
              "50": "#382359",
              "100": "#4a2e74",
              "200": "#5f3b96",
              "300": "#7a4cc0",
              "400": "#8653d3",
              "500": "#9e75dc",
              "600": "#ae8ce2",
              "700": "#c7b0eb",
              "800": "#d9caf1",
              "900": "#f3eefb",
            },
            success: {
              DEFAULT: "#64C917",
              foreground: "#cfeeb7", // contrast color 800
              "50": "#2a540a",
              "100": "#376f0d",
              "200": "#478f10",
              "300": "#5bb715",
              "400": "#64c917",
              "500": "#83d445",
              "600": "#97db64",
              "700": "#b8e694",
              "800": "#cfeeb7",
              "900": "#f0fae8",
            },
            warning: {
              DEFAULT: "#F56D24",
              foreground: "#fcd2bb", // contrast color 800
              "50": "#672e0f",
              "100": "#873c14",
              "200": "#ae4d1a",
              "300": "#df6321",
              "400": "#f56d24",
              "500": "#f78a50",
              "600": "#f89d6c",
              "700": "#fabc9a",
              "800": "#fcd2bb",
              "900": "#fef0e9",
            },
            danger: {
              DEFAULT: "#B0120C",
              foreground: "#e7b6b4", // contrast color 800
              "50": "#4a0805",
              "100": "#610a07",
              "200": "#7d0d09",
              "300": "#a0100b",
              "400": "#b0120c",
              "500": "#c0413d",
              "600": "#ca605c",
              "700": "#db928f",
              "800": "#e7b6b4",
              "900": "#f7e7e7",
            },
          },
        },
        light: {
          // Saturn
          colors: {},
        },
        ceres: {
          colors: {},
        },
        umbriel: {
          colors: {},
        },
        neptune: {
          colors: {},
        },
        callisto: {
          colors: {},
        },
      },
    }),
  ],
} satisfies Config;
