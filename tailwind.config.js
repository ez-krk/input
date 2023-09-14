module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    styled: true,
    // TODO: Theme needs works
    themes: [
      {
        solana: {
          /* your theme name */
          fontFamily: {
            display: ["PT Mono, monospace"],
            body: ["Inter, sans-serif"],
          },
          letterSpacing: {
            tightest: "-.075em",
            tighter: "-.05em",
            tight: "-.03em",
            normal: "0",
            wide: ".03em",
            wider: ".05em",
            widest: ".1em",
            widest: ".25em",
          },
          primary: "#2a2a2a" /* Primary color */,
          "primary-focus": "#9945FF" /* Primary color - focused */,
          "primary-content":
            "#ffffff" /* Foreground content color to use on primary color */,

          secondary: "#9513f1" /* Secondary color */,
          "secondary-focus": "#9513f1" /* Secondary color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on secondary color */,

          accent: "#33a382" /* Accent color */,
          "accent-focus": "#2aa79b" /* Accent color - focused */,
          "accent-content":
            "#ffffff" /* Foreground content color to use on accent color */,

          neutral: "#2b2b2b" /* Neutral color */,
          "neutral-focus": "#2a2e37" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#181818" /* Base color of page, used for blank backgrounds */,
          "base-200": "#35363a" /* Base color, a little darker */,
          "base-300": "#222222" /* Base color, even more darker */,
          "base-content":
            "#f9fafb" /* Foreground content color to use on base color */,

          info: "#1370f1" /* Info */,
          success: "#14F195" /* Success */,
          warning: "#f19513" /* Warning */,
          error: "#E00" /* Error */,
        },
      },
      // backup themes:
      // 'dark',
      // 'synthwave'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
