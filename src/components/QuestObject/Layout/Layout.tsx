import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import Icon from "@/ui/Icon";
import NavLink from "@/components/NavLink";
import EditableTypography from "@/components/EditableTypography";
import debounce from "just-debounce-it";
import useUpdateQuest from "@/hooks/useUpdateQuest";
import useFetchQuest from "@/hooks/useFetchQuest";
import Image from "next/image";
import ActionMenu from "./components/ActionMenu";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useFetchQuest(id as string);
  const updateQuest = useUpdateQuest(id as string);

  const handleUpdate = debounce(async (value: string) => {
    await updateQuest.mutateAsync({ name: value });
  }, 2000);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Icon iconName="Loading" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 py-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/quest-icon.png`}
          alt="Quest"
          height={60}
          width={60}
        />
        <EditableTypography
          initialValue={data?.name ?? ""}
          handleChange={handleUpdate}
          variant="headline"
        />
      </div>
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex items-center justify-start gap-4">
          <NavLink to={`/quests/${id as string}`} src="dungeon-icon.png">
            Overview
          </NavLink>
          <NavLink
            to={`/quests/${id as string}/objectives`}
            src="bell-icon.png"
          >
            Objectives
          </NavLink>
          <NavLink
            to={`/quests/${id as string}/encounters`}
            src="door-icon.png"
          >
            Encounters
          </NavLink>
          <NavLink to={`/quests/${id as string}/quests`} src="quest-icon.png">
            Sub Quests
          </NavLink>
        </div>
        <ActionMenu />
      </div>
      <div className="pt-8">{children}</div>
    </>
  );
};

export default Layout;
