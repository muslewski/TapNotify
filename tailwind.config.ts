/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
import tailwindcssAnimate from "tailwindcss-animate";

const config = withUt({
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>) /* #E4E2E8 */",
        input: "hsl(var(--input) / <alpha-value>) /* #E4E2E8 */",
        ring: "hsl(var(--ring) / <alpha-value>) /* #561EC6 */",
        background: "hsl(var(--background) / <alpha-value>) /* #FFFFFF */",
        foreground: "hsl(var(--foreground) / <alpha-value>) /* #08080A */",
        primary: {
          "100": "hsl(var(--primary-100) / <alpha-value>) /* #DFD2F8 */",
          "200": "hsl(var(--primary-200) / <alpha-value>) /* #BFA6F1 */",
          "300": "hsl(var(--primary-300) / <alpha-value>) /* #9F7AEA */",
          "400": "hsl(var(--primary-400) / <alpha-value>) /* #804EE3 */",
          "500": "hsl(var(--primary-500) / <alpha-value>) /* #6022DC */",
          "600": "hsl(var(--primary-600) / <alpha-value>) /* #561EC6 */",
          "700": "hsl(var(--primary-700) / <alpha-value>) /* #4D1BB0 */",
          "800": "hsl(var(--primary-800) / <alpha-value>) /* #391484 */",
          "900": "hsl(var(--primary-900) / <alpha-value>) /* #260D58 */",
          DEFAULT: "hsl(var(--primary) / <alpha-value>) /* #561EC6 */",
          foreground:
            "hsl(var(--primary-foreground) / <alpha-value>) /* #F9F9F9 */",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>) /* #F4F3F5 */",
          foreground:
            "hsl(var(--secondary-foreground) / <alpha-value>) /* #561EC6 */",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>) /* #EE4444 */",
          foreground:
            "hsl(var(--destructive-foreground) / <alpha-value>) /* #F9F9F9 */",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>) /* #F4F3F5 */",
          foreground:
            "hsl(var(--muted-foreground) / <alpha-value>) /* #74717A */",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>) /* #F4F3F5 */",
          foreground:
            "hsl(var(--accent-foreground) / <alpha-value>) /* #561EC6 */",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>) /* #FFFFFF */",
          foreground:
            "hsl(var(--popover-foreground) / <alpha-value>) /* #08080A */",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>) /* #FFFFFF */",
          foreground:
            "hsl(var(--card-foreground) / <alpha-value>) /* #08080A */",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    plugins: [tailwindcssAnimate],
  },
});

export default config;
