import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#050507",
          50: "#0a0a12",
          100: "#0f0f1a",
        },
        bone: {
          DEFAULT: "#f5f5f7",
          dim: "rgba(245, 245, 247, 0.6)",
          dimmer: "rgba(245, 245, 247, 0.4)",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          hi: "rgba(255, 255, 255, 0.08)",
          line: "rgba(255, 255, 255, 0.1)",
        },
      },
      animation: {
        "aurora-1": "aurora1 22s ease-in-out infinite",
        "aurora-2": "aurora2 28s ease-in-out infinite",
        "aurora-3": "aurora3 35s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "shimmer": "shimmer 2.4s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        aurora1: {
          "0%, 100%": { transform: "translate(-10%, -10%) scale(1)" },
          "50%": { transform: "translate(20%, 30%) scale(1.3)" },
        },
        aurora2: {
          "0%, 100%": { transform: "translate(30%, 20%) scale(1.1)" },
          "50%": { transform: "translate(-15%, -25%) scale(0.9)" },
        },
        aurora3: {
          "0%, 100%": { transform: "translate(-20%, 30%) scale(0.95)" },
          "50%": { transform: "translate(25%, -15%) scale(1.2)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
