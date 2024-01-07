import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import Image from "next/image";
import StandardHero from "@/ui/StandardHero";
import useFetchCharacter from "@/hooks/useFetchCharacter";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useFetchCharacter(id as string);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <StandardHero
        media={
          <Image
            src={data?.class?.image_url ?? "/"}
            alt={data?.name ?? ""}
            height={60}
            width={60}
            className="rounded-full border-2 border-primary-500"
          />
        }
        title={data?.name ?? ""}
        metadata={`Level ${data?.level} ${data?.race?.name} ${data?.class?.name}`}
        className="aspect-auto"
      />
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex flex-1 items-center justify-start gap-4">
          <NavLink to={`/characters/${id as string}`} src="dungeon-icon.png">
            Character
          </NavLink>
          <NavLink
            to={`/characters/${id as string}/actions`}
            src="quest-icon.png"
          >
            Actions
          </NavLink>
          <NavLink
            to={`/characters/${id as string}/spells`}
            src="quest-icon.png"
          >
            Spells
          </NavLink>
          <NavLink
            to={`/characters/${id as string}/inventory`}
            src="quest-icon.png"
          >
            Inventory
          </NavLink>
        </div>
      </div>
      <div className="w-full pt-8">{children}</div>
    </>
  );
};

export default Layout;
