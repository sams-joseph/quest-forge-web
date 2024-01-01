import React from "react";
import Checkbox from "@/ui/Checkbox";
import type { QuestObjective } from "@/hooks/useFetchQuestObjectives";
import useUpdateQuestObjective from "@/hooks/useUpdateQuestObjective";
import debounce from "just-debounce-it";
import StandardRow from "@/ui/StandardRow";

const QuestRow = ({
  node,
  refetch,
}: {
  node: QuestObjective;
  refetch: () => void;
}) => {
  const { id, name, status } = node;

  const updateQuestObjective = useUpdateQuestObjective(id);

  const handleUpdate = debounce(async (value: string) => {
    await updateQuestObjective.mutateAsync({ name: value });
    void refetch();
  }, 2000);

  const handleToggleStatus = async (value: boolean) => {
    await updateQuestObjective.mutateAsync({
      status: value ? "COMPLETED" : "INCOMPLETE",
    });
    void refetch();
  };

  return (
    <StandardRow
      title={name}
      onChange={handleUpdate}
      editable
      media={
        <Checkbox
          id={id}
          checked={status === "COMPLETED"}
          onChange={handleToggleStatus}
        />
      }
    />
  );
};

export default QuestRow;
