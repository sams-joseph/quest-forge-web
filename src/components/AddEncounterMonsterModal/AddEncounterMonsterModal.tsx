import React, { type ReactElement, useMemo, useState } from "react";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import Input from "@/ui/Input";
import toast from "react-hot-toast";
import { type Toggle } from "@/hooks/useToggle";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import useFetchMonsters, { type Monster } from "@/hooks/useFetchMonsters";
import MonsterObject from "../MonsterObject";
import InfiniteList from "../InfiniteList";
import Checkbox from "@/ui/Checkbox";
import useAddEncounterMonster from "@/hooks/useAddEncounterMonster";
import { useRouter } from "next/router";

const AddEncounterMonsterModal = ({ toggle }: { toggle: Toggle }) => {
  const router = useRouter();
  const { encounter_id } = router.query;
  const { inputProps, debouncedValue } = useDebouncedSearch();
  const { data, isError, getInfiniteProps } = useFetchMonsters(
    {
      name: debouncedValue,
    },
    toggle.isToggled,
  );

  const [selected, setSelected] = useState<string>("");

  const addMonster = useAddEncounterMonster(encounter_id as string);

  const edges: Monster[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Monster[]);
    }

    return [];
  }, [data]);

  const renderComponent = (index: unknown): ReactElement => {
    if (typeof index !== "number") return <div></div>;

    const node = edges[index];

    if (!node) {
      return <div>No monster found</div>;
    }

    return (
      <Checkbox
        id={node?.id}
        key={node?.id}
        checked={selected === node?.id}
        onChange={() => setSelected(node?.id)}
        label={<MonsterObject displayType="ROW" node={node} />}
      />
    );
  };

  const handleCreateMonster = async () => {
    await toast.promise(addMonster.mutateAsync({ monster_id: selected }), {
      loading: "Adding monster...",
      success: "Added monster",
      error: "Error adding encounter",
    });

    void handleOpenChange();
  };

  const handleOpenChange = () => {
    setSelected("");
    toggle.toggleOff();
  };

  if (isError) {
    return <div className="flex items-center justify-center p-4">Error</div>;
  }

  return (
    <Modal
      open={toggle.isToggled}
      trigger={null}
      onOpenChange={handleOpenChange}
      title="Add Monster"
      description="Let's challenge the party!"
    >
      <div className="flex h-[60vh] flex-col gap-2">
        <Input
          name="search"
          placeholder="Search"
          {...inputProps()}
          rounded="md"
        />
        <div className="flex-1 overflow-auto">
          <InfiniteList
            items={edges}
            renderComponent={renderComponent}
            defaultScrollParent
            {...getInfiniteProps()}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button
            onClick={handleCreateMonster}
            disabled={addMonster.isPending || !Boolean(selected)}
          >
            Add Monster
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEncounterMonsterModal;
