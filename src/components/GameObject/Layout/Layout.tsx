import React, { type ReactElement } from "react";
import useFetchGame from "@/hooks/useFetchGame";
import { useRouter } from "next/router";
import Players from "./components/Players";
import Icon from "@/ui/Icon";
import NavLink from "@/components/NavLink";
import useUpdateGame from "@/hooks/useUpdateGame";
import debounce from "just-debounce-it";
import Image from "next/image";
import StandardHero from "@/ui/StandardHero";
import toast from "react-hot-toast";
import ActionMenu from "./components/ActionMenu";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useFetchGame(id as string);
  const updateGame = useUpdateGame(id as string);

  const handleUpdate = debounce(async (value: string) => {
    await toast.promise(updateGame.mutateAsync({ name: value }), {
      loading: "Updating...",
      success: "Updated",
      error: "Error updating",
    });
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
      <StandardHero
        backgroundUrl={`${process.env.NEXT_PUBLIC_S3_URL}/assets/desert-hero-bg.jpg`}
        media={
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/flag-icon.png`}
            alt="Campaign"
            height={60}
            width={60}
          />
        }
        title={data?.name ?? ""}
        onChange={handleUpdate}
        editable
      />
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex flex-1 items-center justify-start gap-4">
          <NavLink to={`/campaigns/${id as string}`} src="dungeon-icon.png">
            Overview
          </NavLink>
          <NavLink
            to={`/campaigns/${id as string}/adventures`}
            src="quest-icon.png"
          >
            Adventures
          </NavLink>
        </div>
        <ActionMenu />
      </div>
      <div className="grid w-full grid-cols-1 gap-x-0 gap-y-4 pt-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4">
        <div className="col-span-3">{children}</div>
        <Players players={data?.players ?? []} links={data?.invite_links} />
      </div>
    </>
  );
};

export default Layout;
