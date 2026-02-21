/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#164E63",
        "primary-dark": "#0E3A4A",
        "primary-light": "#1D6A84",
        secondary: "#94C4D8",
        "secondary-dark": "#6AAEC9",
        danger: "#DC2626",
        "danger-dark": "#B91C1C",
        chatPrimary: "#2C8CBA",
        // Backgrounds
        "background-light": "#F3F6F9",
        "background-dark": "#0F172A",
        // Cards
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",
        // Inputs
        "input-light": "#F8FAFC",
        "input-dark": "#334155",
        // Borders
        "border-light": "#E2E8F0",
        "border-dark": "#475569",
        // Text
        "text-light": "#334155",
        "text-dark": "#E2E8F0",
        "label-light": "#64748B",
        "label-dark": "#94A3B8",
        // Sections semânticas — cores por domínio
        "section-supplier": "#DC2626",
        "section-product": "#164E63",
        "section-dimensions": "#0369A1",
        "section-logistics": "#C2410C",
        "section-fiscal": "#0369A1",
        "section-mg": "#1D4ED8",
        "section-sp": "#15803D",
        "section-internal": "#7C3AED",
        "section-image": "#4B5563",
        // GS1
        "gs1-orange": "#F26334",
        "gs1-blue": "#002C6C"
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "3xl": "2rem",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-24px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-success": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(52, 211, 153, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(52, 211, 153, 0)" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        "check-bounce": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.35s ease-out",
        "pulse-success": "pulse-success 1.5s ease-in-out 3",
        "progress-fill": "progress-fill 0.5s ease-out forwards",
        "check-bounce": "check-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
    },
  },
  plugins: [],
}
