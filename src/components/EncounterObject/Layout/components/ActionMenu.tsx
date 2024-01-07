import React from "react";
import DropdownMenu from "@/ui/DropdownMenu";
import Button from "@/ui/Button";
import Typography from "@/ui/Typography";
import Icon from "@/ui/Icon";
import AddEncounterMonsterModal from "@/components/AddEncounterMonsterModal";
import useToggle from "@/hooks/useToggle";
// import { useRouter } from "next/router";
// import toast from "react-hot-toast";

const ActionMenu = () => {
  // const router = useRouter();
  // const { encounter_id } = router.query;
  const addMonsterToggle = useToggle();

  return (
    <>
      <DropdownMenu
        menu={
          <>
            <DropdownMenu.Item
              onSelect={addMonsterToggle.toggleOn}
              className="group relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black-800"
            >
              <Icon iconName="Plus" />
              <Typography variant="subtitle2">Monster</Typography>
            </DropdownMenu.Item>
          </>
        }
      >
        <Button size="medium" rounded="md" endIconName="ChevronDown">
          Actions
        </Button>
      </DropdownMenu>
      <AddEncounterMonsterModal toggle={addMonsterToggle} />
    </>
  );
};

export default ActionMenu;
