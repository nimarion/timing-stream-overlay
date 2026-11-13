/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          accent: "var(--theme-accent)",
          panel: "var(--theme-panel-bg)",
          primary: "var(--theme-text-primary)",
          secondary: "var(--theme-text-secondary)",
          muted: "var(--theme-text-muted)",
          border: "var(--theme-row-border)",
        },
      },
      fontFamily: {
        display: ["var(--theme-font-display)"],
        mono: ["var(--theme-font-mono)"],
      },
      backgroundImage: {
        "theme-row": "var(--theme-row-bg)",
      },
      boxShadow: {
        "theme-glow": "0 4px 12px var(--theme-accent-glow)",
        "theme-panel": "0 4px 12px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
