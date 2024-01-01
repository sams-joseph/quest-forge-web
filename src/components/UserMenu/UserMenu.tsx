import React from "react";
import DropdownMenu from "@/ui/DropdownMenu";
import Avatar from "@/ui/Avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/hooks/useAuth";

const UserMenu = () => {
  const { user, logout } = useAuth({ middleware: "auth" });

  return (
    <DropdownMenu
      menu={
        <>
          <DropdownMenu.Label className="p-2 text-sm">
            {user?.name}
          </DropdownMenu.Label>
          <DropdownMenu.Item
            onSelect={() => logout()}
            className="data-[highlighted]:bg-black-800 group relative flex cursor-pointer select-none items-center rounded-[3px] p-2 text-[13px] leading-none outline-none data-[disabled]:pointer-events-none"
          >
            Sign out
            <div className="ml-auto pl-[20px]">
              <ExitIcon />
            </div>
          </DropdownMenu.Item>
        </>
      }
    >
      <Avatar
        imageSrc={undefined}
        alt={"User"}
        classes="cursor-pointer border border-1 border-primary-500"
      />
    </DropdownMenu>
  );
};

export default UserMenu;
