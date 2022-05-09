import * as React from "react";
import { textStyles, TextVariants } from "./text.css";

type TextProps = TextVariants & {
  children?: React.ReactNode;
};

export function Text(props: TextProps) {
  const { center, variant, ...rest } = props;
  const className = textStyles({ center, variant });
  return <p {...rest} className={className} />;
}
