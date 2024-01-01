import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import Icon from "@/ui/Icon";
import NavLink from "@/components/NavLink";
import EditableTypography from "@/components/EditableTypography";
import debounce from "just-debounce-it";
import useUpdateQuest from "@/hooks/useUpdateQuest";
import useFetchQuest from "@/hooks/useFetchQuest";
import Link from "next/link";
import type { Game } from "@/hooks/useFetchGames";
import type { Quest } from "@/hooks/useFetchGameQuests";
import Image from "next/image";

const ROUTE_MAP: Record<
  string,
  (node: Game | Quest) => { label: string; href: string }[]
> = {
  "App\\Models\\Game": (node: Game | Quest) => [
    { label: node.name, href: `/campaigns/${node.id}` },
    { label: "Quests", href: `/campaigns/${node.id}/quests` },
  ],
  "App\\Models\\Quest": (node: Game | Quest) => [
    { label: node.name, href: `/quests/${node.id}` },
  ],
};

// TODO: This needs to be made into a more scalable solution, but for now it works
// I don't want to do this one off for every single game object
const Parent = ({
  node,
  type,
}: {
  node: Game | Quest | undefined;
  type: string | undefined;
}) => {
  if (!node || !type) return null;

  const navigationTos = ROUTE_MAP[type]?.(node) ?? [];

  return (
    <div className="flex items-center gap-2">
      {navigationTos.map((route, i) => (
        <Link
          key={i}
          href={route.href}
          className="flex items-center text-black-200 hover:text-white"
        >
          {route.label}
          <Icon iconName="ChevronRight" />
        </Link>
      ))}
    </div>
  );
};

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
      <div className="flex items-center gap-4">
        <Parent node={data?.questable} type={data?.questable_type} />
      </div>
      <div className="flex w-full items-center justify-start gap-4">
        <NavLink to={`/quests/${id as string}`} src="dungeon-icon.png">
          Overview
        </NavLink>
        <NavLink to={`/quests/${id as string}/objectives`} src="bell-icon.png">
          Objectives
        </NavLink>
        <NavLink to={`/quests/${id as string}/encounters`} src="door-icon.png">
          Encounters
        </NavLink>
        <NavLink to={`/quests/${id as string}/quests`} src="quest-icon.png">
          Sub Quests
        </NavLink>
      </div>
      <div className="pt-8">{children}</div>
    </>
  );
};

export default Layout;
