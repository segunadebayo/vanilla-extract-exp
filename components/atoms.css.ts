import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

const layoutStyles = defineProperties({
  conditions: {
    xs: {},
    md: { "@media": "screen and (min-width: 768px)" },
    lg: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "xs",
  properties: {
    display: ["none", "block", "flex"],
    flexDirection: ["row", "column"],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    width: ["16px", "100%"],
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    // etc.
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

export const atoms = createSprinkles(layoutStyles);
