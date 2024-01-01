import React, { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const typography = cva("div", {
  variants: {
    variant: {
      headline: ["text-[24px]", "font-bold"],
      subtitle: ["text-xl", "font-semibold"],
      subtitle2: ["text-lg", "font-semibold"],
      body1: ["text-base", "font-regular"],
      caption: ["text-sm", "font-regular"],
    },
    color: {
      default: ["text-white"],
      primary: ["text-primary-500"],
      muted: ["text-[#ABB1CC]"],
      error: ["text-error-500"],
    },
  },
  defaultVariants: {
    variant: "body1",
    color: "default",
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof typography> {
  children: ReactNode | string;
  classes?: string;
  editable?: boolean;
}

const Typography = ({ children, variant, color, classes }: TypographyProps) => {
  return (
    <div className={typography({ variant, color, className: classes })}>
      {children}
    </div>
  );
};

export default Typography;
