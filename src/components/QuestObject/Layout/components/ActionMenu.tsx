import React from "react";
import DropdownMenu from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import Typography from "@/ui/Typography";
import Icon from "@/ui/Icon";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useCreateQuestObjective from "@/hooks/useCreateQuestObjective";
import useCreateEncounter from "@/hooks/useCreateEncounter";
import useCreateQuestSubquest from "@/hooks/useCreateQuestSubquest";

const ActionMenu = () => {
  const router = useRouter();
  const { quest_id } = router.query;

  const createQuestObjective = useCreateQuestObjective(quest_id as string);
  const createEncounter = useCreateEncounter(quest_id as string);
  const createSubquest = useCreateQuestSubquest(quest_id as string);

  const handleCreateQuest = async () => {
    await createSubquest.mutateAsync({
      name: "New Quest",
    });
  };

  const handleCreate = async () => {
    await toast.promise(handleCreateQuest(), {
      loading: "Creating quest...",
      success: "Created quest",
      error: "Error creating quest",
    });
  };

  const handleCreateObjective = async () => {
    await toast.promise(
      createQuestObjective.mutateAsync({
        name: "New Objective",
      }),
      {
        loading: "Creating objective...",
        success: "Created objective",
        error: "Error creating objective",
      },
    );
  };

  const handleCreateEncounter = async () => {
    await toast.promise(
      createEncounter.mutateAsync({
        name: "New Encounter",
      }),
      {
        loading: "Creating encounter...",
        success: "Created encounter",
        error: "Error creating encounter",
      },
    );
  };

  return (
    <DropdownMenu
      menu={
        <>
          <DropdownMenu.Item
            onSelect={handleCreateObjective}
            className="group relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800"
          >
            <Icon iconName="Plus" />
            <Typography variant="subtitle2">Objective</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleCreateEncounter}
            className="group relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800"
          >
            <Icon iconName="Plus" />
            <Typography variant="subtitle2">Encounter</Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleCreate}
            className="group relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800"
          >
            <Icon iconName="Plus" />
            <Typography variant="subtitle2">Quest</Typography>
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
