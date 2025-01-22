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
            background: "#01000F", // the page background color
            foreground: "#EEECEC", // the page text color
            divider: "rgba(255, 255, 255, 0.15)", // used for divider and single line border
            overlay: "#F3124A", // used for modal, popover, etc.
            focus: "#F3124A", // used for focus state outline
            content1: "#1A191F", // used for card, modal, popover, etc.
            content2: "#27262D",
            content3: "#34333C",
            content4: "#51505C",

            // brand colors
            default: {
              DEFAULT: "#34333C", // 200
              foreground: "#C3C2CA", // contrast color 700
              "900": "#F0F0F1",
              "800": "#E1E0E4",
              "700": "#C3C2CA",
              "600": "#A6A5B0",
              "500": "#8A8997",
              "400": "#6F6E7E",
              "300": "#51505C", // content4
              "200": "#34333C", // content3 & default
              "100": "#27262D", // content2
              "50": "#1A191F", // content1
            },
            primary: {
              DEFAULT: "#F3124A", // 400
              foreground: "#FFD9D9", // contrast color 800
              "900": "#FFECEC",
              "800": "#FFD9D9",
              "700": "#FFB3B5",
              "600": "#FF8B91",
              "500": "#FC5E6D",
              "400": "#F3124A",
              "300": "#B40A35",
              "200": "#7A0420",
              "100": "#5E0217",
              "50": "#2B0106",
            },
            secondary: {
              DEFAULT: "#8653D3", // 400
              foreground: "#E5DDF9", // contrast color 800
              "900": "#F2EEFC",
              "800": "#E5DDF9",
              "700": "#CCBCF1",
              "600": "#B39AE8",
              "500": "#9C78DE",
              "400": "#8653D3",
              "300": "#623B9C",
              "200": "#402569",
              "100": "#301B51",
              "50": "#130824",
            },
            success: {
              DEFAULT: "#17C94F", // 400
              foreground: "#DBF5DD", // contrast color 800
              "900": "#EDFAEE",
              "800": "#DBF5DD",
              "700": "#B7EBBC",
              "600": "#90E099",
              "500": "#63D576",
              "400": "#17C94F",
              "300": "#0E9538",
              "200": "#066423",
              "100": "#044C19",
              "50": "#023610",
            },
            warning: {
              DEFAULT: "#F57F24", // 400
              foreground: "#FFE7D8", // contrast color 800
              "900": "#FFF3EB",
              "800": "#FFE7D8",
              "700": "#FFCEB1",
              "600": "#FEB589",
              "500": "#FA9B5E",
              "400": "#F57F24",
              "300": "#B65D18",
              "200": "#7B3C0C",
              "100": "#5F2D07",
              "50": "#441F04",
            },
            danger: {
              DEFAULT: "#A6150A", // 400
              foreground: "#F3D3CE", // contrast color 800
              "900": "#F9E9E6",
              "800": "#F3D3CE",
              "700": "#E3A99E",
              "600": "#D27E70",
              "500": "#BD5142",
              "400": "#A6150A",
              "300": "#7A0C05",
              "200": "#510502",
              "100": "#3E0301",
              "50": "#2B0201",
            },
          },
        },
        light: {
          // Saturn
          colors: {
            background: "#FFF8E1", // the page background color
            foreground: "#3E2723", // the page text color
            divider: "rgba(0, 0, 0, 0.15)", // used for divider and single line border
            overlay: "#FFC107", // used for modal, popover, etc.
            focus: "#FFC107", // used for focus state outline
            content1: "#FFF3E0", // used for card, modal, popover, etc.
            content2: "#FFECB3",
            content3: "#FFE082",
            content4: "#FFD54F",

            // brand colors
            default: {
              DEFAULT: "#FFE082", // 200
              foreground: "#4E342E", // contrast color 700
              "900": "#FFFAE6",
              "800": "#FFF5D6",
              "700": "#FFE082",
              "600": "#FFCA60",
              "500": "#FFB733",
              "400": "#FFA000",
              "300": "#C77C00",
              "200": "#8A5800",
              "100": "#664200",
              "50": "#442C00",
            },
            primary: {
              DEFAULT: "#FFC107", // 400
              foreground: "#4E342E", // contrast color 800
              "900": "#FFFDE7",
              "800": "#FFF9C4",
              "700": "#FFF59D",
              "600": "#FFF176",
              "500": "#FFEE58",
              "400": "#FFC107",
              "300": "#FFA000",
              "200": "#FF8F00",
              "100": "#FF6F00",
              "50": "#E65100",
            },
            secondary: {
              DEFAULT: "#D4AF37", // 400
              foreground: "#FDF8E4", // contrast color 800
              "900": "#FAF3D4",
              "800": "#F3E7AE",
              "700": "#E6CF73",
              "600": "#D4AF37",
              "500": "#C29D2A",
              "400": "#A88B24",
              "300": "#7F6A1A",
              "200": "#554911",
              "100": "#3E370C",
              "50": "#29240A",
            },
            success: {
              DEFAULT: "#85BB65", // 400
              foreground: "#F3FAE6", // contrast color 800
              "900": "#F9FCEF",
              "800": "#F0F8DF",
              "700": "#DFF3BF",
              "600": "#CEE99F",
              "500": "#BFE081",
              "400": "#85BB65",
              "300": "#62954B",
              "200": "#436E35",
              "100": "#304E25",
              "50": "#1F3518",
            },
            warning: {
              DEFAULT: "#FFC300", // 400
              foreground: "#FFF7D4", // contrast color 800
              "900": "#FFFBE6",
              "800": "#FFF5B3",
              "700": "#FFE680",
              "600": "#FFD94D",
              "500": "#FFC300",
              "400": "#E6AC00",
              "300": "#B38700",
              "200": "#806200",
              "100": "#4C3E00",
              "50": "#332A00",
            },
            danger: {
              DEFAULT: "#A35709", // 400
              foreground: "#F8E2D4", // contrast color 800
              "900": "#FAEFE6",
              "800": "#F5DFCE",
              "700": "#EBBF9E",
              "600": "#E09E70",
              "500": "#D37B42",
              "400": "#A35709",
              "300": "#7C4307",
              "200": "#553002",
              "100": "#3E2401",
              "50": "#291801",
            },
          },
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
