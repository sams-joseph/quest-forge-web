import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import Icon from "@/ui/Icon";

interface ICheckboxProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: (b: boolean) => void;
}

const Checkbox = ({ id, label, checked, onChange }: ICheckboxProps) => (
  <form>
    <div className="flex items-center">
      <RadixCheckbox.Root
        className="flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] border border-slate-500 bg-black-800 hover:bg-black-900"
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      >
        <RadixCheckbox.Indicator>
          <Icon iconName="Check" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className="pl-[15px] text-[15px] leading-none" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  </form>
);

export default Checkbox;
