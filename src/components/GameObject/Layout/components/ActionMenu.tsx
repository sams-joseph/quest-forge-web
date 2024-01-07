import React from "react";
import DropdownMenu from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import Typography from "@/ui/Typography";
import Icon from "@/ui/Icon";
import { useRouter } from "next/router";
import useCreateGameQuest from "@/hooks/useCreateGameQuest";
import toast from "react-hot-toast";

const ActionMenu = () => {
  const router = useRouter();
  const { campaign_id } = router.query;

  const createGameQuest = useCreateGameQuest(campaign_id as string);

  const handleCreateQuest = async () => {
    await createGameQuest.mutateAsync({
      name: "New Adventure",
    });
  };

  const handleCreate = async () => {
    await toast.promise(handleCreateQuest(), {
      loading: "Creating adventure...",
      success: "Created adventure",
      error: "Error creating adventure",
    });
  };

  return (
    <DropdownMenu
      menu={
        <>
          <DropdownMenu.Item
            onSelect={handleCreate}
            className="group relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800"
          >
            <Icon iconName="Plus" />
            <Typography variant="subtitle2">Adventure</Typography>
          </DropdownMenu.Item>
        </>
      }
    >
      <Button size="medium" rounded="md" endIconName="ChevronDown">
        Actions
      </Button>
    </DropdownMenu>
  );
};

export default ActionMenu;
