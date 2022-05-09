import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  colors: {
    accents: {
      "1": "#fafafa",
      "2": "#eaeaea",
      "3": "#999999",
      "4": "#888888",
      "5": "#666666",
      "6": "#444444",
      "7": "#333333",
      "8": "#111111",
    },
  },
  space: {
    "1x": "4px",
    "2x": "8px",
    "4x": "16px",
    "8x": "32px",
    "16x": "64px",
    "32x": "128px",
    "48x": "192px",
    "64x": "256px",
    "128x": "512px",

    small: "32px",
    medium: "40px",
    large: "48px",

    gap: "24px",
    halfGap: "12px",
    quarterGap: "6px",
  },
});
