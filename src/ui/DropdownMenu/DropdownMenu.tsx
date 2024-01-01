import React, { type ReactNode } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import Pane from "@/ui/Pane";

interface IDropdownMenuProps {
  children: ReactNode;
  menu: ReactNode;
  align?: "start" | "end";
}

const DropdownMenu = ({ children, menu, ...rest }: IDropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
          align="end"
          {...rest}
        >
          <Pane>
            <div className="p-2">{menu}</div>
          </Pane>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

DropdownMenu.Item = RadixDropdownMenu.Item;
DropdownMenu.Label = RadixDropdownMenu.Label;

export default DropdownMenu;
