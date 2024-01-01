import React, { type ReactNode, type MouseEventHandler } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Icon from "../Icon";

const button = cva("button", {
  variants: {
    variant: {
      primary: [
        "bg-primary-500",
        "active:opacity-90",
        "flex",
        "items-center",
        "justify-center",
      ],
      text: [
        "bg-transparent",
        "active:opacity-90",
        "flex",
        "items-center",
        "justify-center",
        "hover:bg-black-800",
      ],
    },
    rounded: {
      full: ["rounded-full"],
      lg: ["rounded-lg"],
      md: ["rounded-md"],
      sm: ["rounded-sm"],
      none: ["rounded-none"],
    },
    size: {
      small: ["text-sm", "py-1", "px-1", "font-normal"],
      medium: ["text-base", "py-2", "px-2", "font-semibold"],
      large: ["text-md", "py-4", "px-4", "font-bold"],
    },
    elevation: {
      none: ["shadow-none"],
      sm: ["shadow-sm"],
      md: ["shadow-md"],
      lg: ["shadow-lg"],
      xl: ["shadow-xl"],
    },
    disabled: {
      true: ["opacity-25", "cursor-not-allowed"],
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "md",
    size: "medium",
    elevation: "none",
  },
});

const text = cva("text", {
  variants: {
    variant: {
      primary: ["text-white"],
      text: ["text-white"],
    },
    size: {
      small: ["text-sm"],
      medium: ["text-md"],
      large: ["text-xl"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof button>, "disabled"> {
  children: ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  classes?: string;
  iconName?: string;
  endIconName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      variant,
      size,
      rounded,
      elevation,
      classes, // disabled,
      iconName,
      endIconName,
      disabled,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={button({
          variant,
          size,
          rounded,
          elevation,
          disabled,
          className: classes,
        })}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        <div
          className={text({
            variant,
            size,
            className: "flex items-center gap-2",
          })}
        >
          {iconName && <Icon iconName={iconName} />}
          {children}
          {endIconName && <Icon iconName={endIconName} />}
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
