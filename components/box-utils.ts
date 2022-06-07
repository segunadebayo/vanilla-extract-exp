import React, { createElement, forwardRef } from "react";

type CreateBoxParams<AtomsFn> = {
  atoms: AtomsFn;
  defaultClassName?: string;
};

interface AtomsFnBase {
  (...args: any): string;
  properties: Set<string>;
}

function composeClassNames(...classNames: Array<string | undefined>) {
  const classes = classNames
    .filter((className) => {
      return Boolean(className) && className !== " ";
    })
    .map((className) => {
      return className?.toString().trim();
    }) as Array<string>;
  return classes.length === 0 ? undefined : classes.join(" ");
}

function extractAtomsFromProps<AtomsFn extends AtomsFnBase>(
  props: any,
  atomsFn: AtomsFn
) {
  let hasAtomProps = false;
  let atomProps: Record<string, unknown> = {};
  let otherProps: Record<string, unknown> = {};

  for (const key in props) {
    if (atomsFn.properties.has(key)) {
      hasAtomProps = true;
      atomProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  }

  return { hasAtomProps, atomProps, otherProps };
}

type HTMLProperties = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width"
>;

export function createBox<AtomsFn extends AtomsFnBase>({
  atoms: atomsFn,
  defaultClassName,
}: CreateBoxParams<AtomsFn>) {
  type BoxProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
  } & Parameters<AtomsFn>[0] &
    HTMLProperties;

  const Box = forwardRef<HTMLElement, BoxProps>(
    ({ as: element = "div", className, ...props }: BoxProps, ref) => {
      const { atomProps, otherProps } = extractAtomsFromProps(props, atomsFn);

      return createElement(element, {
        ref,
        ...otherProps,
        className: composeClassNames(
          className,
          atomsFn(atomProps),
          defaultClassName
        ),
      });
    }
  );

  Box.displayName = "Box";

  return Box;
}
