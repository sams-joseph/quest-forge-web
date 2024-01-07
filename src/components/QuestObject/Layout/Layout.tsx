import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import EditableTypography from "@/components/EditableTypography";
import debounce from "just-debounce-it";
import useUpdateQuest from "@/hooks/useUpdateQuest";
import useFetchQuest from "@/hooks/useFetchQuest";
import Image from "next/image";
import ActionMenu from "./components/ActionMenu";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { quest_id } = router.query;

  const { data, isLoading } = useFetchQuest(quest_id as string);
  const updateQuest = useUpdateQuest(quest_id as string);

  const handleUpdate = debounce(async (value: string) => {
    await updateQuest.mutateAsync({ name: value });
  }, 2000);

  if (isLoading) {
    return <ProfileSkeleton />;
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
          <NavLink to={`/quests/${quest_id as string}`} src="dungeon-icon.png">
            Overview
          </NavLink>
          <NavLink
            to={`/quests/${quest_id as string}/objectives`}
            src="bell-icon.png"
          >
            Objectives
          </NavLink>
          <NavLink
            to={`/quests/${quest_id as string}/encounters`}
            src="door-icon.png"
          >
            Encounters
          </NavLink>
          <NavLink
            to={`/quests/${quest_id as string}/quests`}
            src="quest-icon.png"
          >
            Quests
          </NavLink>
        </div>
        <ActionMenu />
      </div>
      <div className="pt-8">{children}</div>
    </>
  );
};

export default Layout;
