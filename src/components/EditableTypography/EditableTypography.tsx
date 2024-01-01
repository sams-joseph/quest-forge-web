import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva("input", {
  variants: {
    variant: {
      headline: ["text-[24px]", "font-bold"],
      subtitle: ["text-xl", "font-semibold"],
      subtitle2: ["text-lg", "font-semibold"],
      body1: ["text-base", "font-regular"],
      caption: ["text-sm", "font-regular"],
    },
  },
  defaultVariants: {
    variant: "body1",
  },
});

export interface EditableTypographyProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  initialValue: string | undefined;
  handleChange?: (value: string) => void | undefined;
}

const EditableTypography = ({
  initialValue,
  variant,
  handleChange: _handleChange,
  ...rest
}: EditableTypographyProps) => {
  const [state, setState] = useState<string>(initialValue ?? "");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setState(newValue);
    if (_handleChange) {
      void _handleChange(newValue);
    }
  };

  return (
    <input
      onChange={handleChange}
      value={state}
      className={inputVariants({
        variant,
        className: "w-full bg-transparent focus:outline-none",
      })}
      {...rest}
    />
  );
};

export default EditableTypography;
