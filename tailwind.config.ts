import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Colors
        "primary-warm-gold": "#E2994A",
        "primary-cream": "#FFF9F0",
        "primary-deep-brown": "#3D2C29",

        // Secondary Colors
        "secondary-gold-light": "#F1B76C",
        "secondary-gold-pale": "#FFF1DE",

        // Accent Colors
        "accent-mauve": "#AF7A9D",
        "accent-sage": "#7BAF7C",
        "accent-terracotta": "#D97E4A",
        "accent-teal": "#5AA9A9",

        // Functional Colors
        "success-green": "#6B9D54",
        "error-red": "#D25F5F",
        "warning-amber": "#E6A94D",
        "information-blue": "#5A96AE",
        "neutral-taupe": "#A89F98",
        "dark-brown": "#4A3B36",

        // Background Colors
        "background-ivory": "#FFFCF7",
        "background-light": "#F9F5F0",
        "background-dark": "#352A27",
        "surface-dark": "#2A211F",

        // Dark Mode Colors
        "dark-background": "#1E1915",
        "dark-surface": "#2A211F",
        "dark-surface-elevated": "#352A27",
        "dark-text-primary": "#F5EFE9",
        "dark-text-secondary": "#C7BCB4",
        "dark-dividers": "#4A3B36",

        // Standard Tailwind mappings
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "Roboto", "sans-serif"],
      },
      fontSize: {
        // Headings
        h1: ["32px", { lineHeight: "40px", letterSpacing: "-0.2px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "32px", letterSpacing: "-0.2px", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "28px", letterSpacing: "-0.1px", fontWeight: "600" }],
        h4: ["18px", { lineHeight: "24px", letterSpacing: "0px", fontWeight: "600" }],

        // Body Text
        "body-large": ["17px", { lineHeight: "26px", letterSpacing: "0px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", letterSpacing: "0px", fontWeight: "400" }],
        "body-small": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "400" }],

        // Special Text
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.2px", fontWeight: "500" }],
        "button-text": ["16px", { lineHeight: "24px", letterSpacing: "0.1px", fontWeight: "500" }],
        "link-text": ["16px", { lineHeight: "24px", letterSpacing: "0px", fontWeight: "500" }],
        overline: ["12px", { lineHeight: "16px", letterSpacing: "1px", fontWeight: "600" }],
      },
      spacing: {
        micro: "4px",
        small: "8px",
        default: "16px",
        medium: "24px",
        large: "32px",
        xlarge: "48px",
        max: "64px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(61, 44, 41, 0.08)",
        "card-hover": "0 4px 12px rgba(61, 44, 41, 0.12)",
        "input-focus": "0 0 0 2px #E2994A",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
