import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { type VariantProps, cva } from "class-variance-authority";

export type InputVariantProps = VariantProps<typeof inputVariants>;
export const inputVariants = cva("input", {
  variants: {
    variant: {
      filled: [
        "w-full",
        "border-none",
        "bg-black-800",
        "text-white",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-primary-500",
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
      small: ["text-sm", "py-1", "px-1"],
      medium: ["text-base", "py-2", "px-2"],
      large: ["text-md", "px-4", "py-2", "h-12"],
    },
    disabled: {
      true: ["opacity-25", "cursor-not-allowed"],
    },
    error: {
      true: ["border-red-700"],
      false: ["border-slate-700"],
    },
  },
  defaultVariants: {
    variant: "filled",
    rounded: "full",
    size: "large",
  },
});

interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<InputVariantProps, "disabled"> {
  name: string;
  label?: string;
  placeholder?: string;
  classes?: string;
  errors?: Record<string, unknown>;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      variant,
      rounded,
      classes,
      type,
      size,
      errors,
      ...rest
    }: IInputProps,
    ref,
  ) => {
    const { name, disabled } = rest;

    return (
      <div>
        {label && (
          <label htmlFor={name} className="text-xs font-bold text-black-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputVariants({
            variant,
            rounded,
            size,
            disabled,
            className: classes,
            error: !!errors?.[name],
          })}
          type={type}
          {...rest}
        />
        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="mt-2 text-xs text-red-500">{message}</p>
            )}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
