import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import NavLink from "@/components/NavLink";
import Image from "next/image";
import useFetchEncounter from "@/hooks/useFetchEncounter";
import StandardHero from "@/ui/StandardHero";
import ActionMenu from "./components/ActionMenu";
import debounce from "just-debounce-it";
import useUpdateEncounter from "@/hooks/useUpdateEncounter";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";

const Layout = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { encounter_id } = router.query;

  const { data, isLoading } = useFetchEncounter(encounter_id as string);
  const updateEncounter = useUpdateEncounter(encounter_id as string);

  const handleUpdate = debounce(async (value: string) => {
    await toast.promise(updateEncounter.mutateAsync({ name: value }), {
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
        media={
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/assets/encounters-icon.png`}
            alt={data?.name ?? ""}
            height={60}
            width={60}
            className="rounded-full border-2 border-primary-500"
          />
        }
        title={data?.name ?? ""}
        metadata={`Total Experience: ${data?.total_xp}`}
        editable
        onChange={handleUpdate}
        className="aspect-auto"
      />
      <div className="flex w-full items-center justify-between py-4">
        <div className="flex items-center justify-start gap-4">
          <NavLink to={`/encounters/${encounter_id as string}`}>
            Overview
          </NavLink>
        </div>
        <ActionMenu />
      </div>
      <div className="pt-8">{children}</div>
    </>
  );
};

export default Layout;
