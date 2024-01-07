import React, { type ReactElement } from "react";
import useFetchGame from "@/hooks/useFetchGame";
import { useRouter } from "next/router";
import Players from "./components/Players";
import NavLink from "@/components/NavLink";
import useUpdateGame from "@/hooks/useUpdateGame";
import debounce from "just-debounce-it";
import Image from "next/image";
import StandardHero from "@/ui/StandardHero";
import toast from "react-hot-toast";
import ActionMenu from "./components/ActionMenu";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { campaign_id } = router.query;

  const { data, isLoading } = useFetchGame(campaign_id as string);
  const updateGame = useUpdateGame(campaign_id as string);

  const handleUpdate = debounce(async (value: string) => {
    await toast.promise(updateGame.mutateAsync({ name: value }), {
      loading: "Updating...",
      success: "Updated",
      error: "Error updating",
    });
  }, 2000);

  if (isLoading) {
    return <ProfileSkeleton />;
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
          <NavLink
            to={`/campaigns/${campaign_id as string}`}
            src="dungeon-icon.png"
          >
            Overview
          </NavLink>
          <NavLink
            to={`/campaigns/${campaign_id as string}/adventures`}
            src="quest-icon.png"
          >
            Adventures
          </NavLink>
        </div>
        <ActionMenu />
      </div>
      <div className="grid w-full grid-cols-1 gap-x-0 gap-y-4 pt-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">{children}</div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Players players={data?.players ?? []} links={data?.invite_links} />
        </div>
      </div>
    </>
  );
};

export default Layout;
