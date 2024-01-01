import React, { type ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ErrorMessage } from "@hookform/error-message";
import { type VariantProps, cva, cx } from "class-variance-authority";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { ChangeHandler } from "react-hook-form";

export type SelectVariantProps = VariantProps<typeof selectVariants>;
export const selectVariants = cva("select", {
  variants: {
    variant: {
      filled: [
        "w-full",
        "border-none",
        "flex",
        "items-center",
        "justify-between",
        "gap-2",
        "bg-black-800",
        "text-white",
        "focus-visible:outline-1",
        "focus:outline-1",
        "focus:outline-primary-500",
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

RadixSelect.Select;

interface ISelectProps extends Omit<SelectVariantProps, "disabled"> {
  name: string;
  label?: string;
  placeholder?: string;
  classes?: string;
  errors?: Record<string, unknown>;
  children: ReactNode;
  disabled?: boolean;
  onChange: ChangeHandler;
}

const Select = ({
  label,
  placeholder,
  variant,
  rounded,
  size,
  disabled,
  classes,
  errors,
  children,
  name,
  onChange,
  ...rest
}: ISelectProps) => (
  <div>
    {label && (
      <label htmlFor={name} className="text-xs font-bold text-black-200">
        {label}
      </label>
    )}
    <RadixSelect.Root
      onValueChange={(value) => onChange({ target: { name, value } })}
      {...rest}
    >
      <RadixSelect.Trigger
        className={selectVariants({
          variant,
          rounded,
          size,
          disabled,
          className: classes,
          error: !!errors?.[name],
        })}
        aria-label={label}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-white">
          <ChevronRightIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden rounded-md border border-black-900 bg-black-950 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <RadixSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-black-950 text-white">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-2">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-black-950 text-white">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="mt-2 text-xs text-red-500">{message}</p>
      )}
    />
  </div>
);

const SelectItem = ({
  children,
  className,
  value,
  ...props
}: {
  children: ReactNode;
  className?: string;
  value: string;
}) => {
  return (
    <RadixSelect.Item
      className={cx(
        className,
        "text-md relative flex select-none items-center rounded-md py-2 pl-[25px] pr-[35px] leading-none text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800 data-[disabled]:text-black-200 data-[highlighted]:text-white data-[highlighted]:outline-none",
      )}
      value={value}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
};

Select.Item = SelectItem;

Select.displayName = "Select";

export default Select;
