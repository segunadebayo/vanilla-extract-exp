import { assignVars, createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

const fontSizes = {
  default: createVar(),
  mobile: createVar(),
  tablet: createVar(),
};

export const textStyles = recipe({
  base: {
    color: vars.colors.accents["3"],
    fontSize: fontSizes.default,
    "@media": {
      "(max-width: 960px)": {
        fontSize: fontSizes.tablet,
      },
      "(max-width: 600px)": {
        fontSize: fontSizes.mobile,
      },
    },
  },
  variants: {
    center: {
      true: {
        textAlign: "center",
      },
    },
    variant: {
      h1: {
        vars: assignVars(fontSizes, {
          default: "4.5rem",
          tablet: "4rem",
          mobile: "2rem",
        }),
        lineHeight: "1.01em",
        fontWeight: 800,
        letterSpacing: "-0.049375rem",
      },
      h2: {
        vars: assignVars(fontSizes, {
          default: "3.5rem",
          tablet: "3rem",
          mobile: "2rem",
        }),
        lineHeight: "1.1em",
        fontWeight: 700,
        letterSpacing: "-0.049375rem",
      },
    },
  },
});

export type TextVariants = {
  variant: "h1" | "h2";
  center?: boolean;
};
