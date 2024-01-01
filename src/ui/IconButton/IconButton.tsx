import React, { type MouseEventHandler } from "react";
import Icon from "@/ui/Icon";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    variant: {
      primary: ["bg-primary-500", "text-white", "hover:bg-primary-600"],
      default: ["bg-black-800", "text-white", "hover:bg-black-950"],
    },
    rounded: {
      full: ["rounded-full"],
      lg: ["rounded-lg"],
      md: ["rounded-md"],
      sm: ["rounded-sm"],
      none: ["rounded-none"],
    },
    size: {
      small: ["text-sm", "py-1", "px-1"],
      medium: ["text-base", "py-2", "px-2"],
      large: ["text-md", "py-4", "px-4"],
    },
    elevation: {
      none: ["shadow-none"],
      sm: ["shadow-sm"],
      md: ["shadow-md"],
      lg: ["shadow-lg"],
      xl: ["shadow-xl"],
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "full",
    size: "medium",
    elevation: "none",
  },
});

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  iconName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      onClick,
      iconName,
      variant,
      size,
      rounded,
      elevation,
      className,
    }: IconButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={button({ variant, size, rounded, elevation, className })}
        onClick={onClick}
      >
        <Icon iconName={iconName} />
      </button>
    );
  },
);

IconButton.displayName = "Button";

export default IconButton;
