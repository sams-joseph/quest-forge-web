import React, { type ReactElement } from "react";
import dynamic from "next/dynamic";
import MainLayout from "@/components/MainLayout";
import { useRouter } from "next/router";
import Icon from "@/ui/Icon";
import Typography from "@/ui/Typography";
import useFetchEncounter from "@/hooks/useFetchEncounter";
import { Layout } from "@/components/EncounterObject";
import useUpdateEncounter from "@/hooks/useUpdateEncounter";
import debounce from "just-debounce-it";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const Encounter = () => {
  const router = useRouter();
  const { encounter_id } = router.query;

  const { data, isLoading, isError } = useFetchEncounter(
    encounter_id as string,
  );
  const updateEncounter = useUpdateEncounter(encounter_id as string);

  const handleUpdate = debounce(async (description: string) => {
    await toast.promise(updateEncounter.mutateAsync({ description }), {
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

  if (isError) {
    return <div className="flex items-center justify-center p-4">Error</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography variant="subtitle">Overview</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Editor
          markdown={data?.description ?? ""}
          onChange={handleUpdate}
          placeholder="Tell us about what the party has in store"
        />
      </div>
    </div>
  );
};

Encounter.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Layout>{page}</Layout>
    </MainLayout>
  );
};

export default Encounter;
