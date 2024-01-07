import React, { useMemo } from "react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import toast from "react-hot-toast";
import { type Toggle } from "@/hooks/useToggle";
import useFetchCharacters, { type Character } from "@/hooks/useFetchCharacters";
import useProcessInviteLink from "@/hooks/useProcessInviteLink";

type Inputs = {
  invite_id: string;
  character_id: string;
};

const JoinCampaignModal = ({ toggle }: { toggle: Toggle }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      invite_id: "",
      character_id: "",
    },
  });

  const { data } = useFetchCharacters();

  const joinGame = useProcessInviteLink();

  const characters: Character[] = useMemo(() => {
    if (data?.pages) {
      return data.pages.flatMap((page) => page.data as Character[]);
    }

    return [];
  }, [data]);

  const handleOpenChange = () => {
    reset();
    toggle.toggleOff();
  };

  const submit: SubmitHandler<Inputs> = async (data) => {
    try {
      await toast.promise(joinGame.mutateAsync(data), {
        loading: "Joining campaign...",
        success: "Joined campaign",
        error: "Error joining campaign",
      });

      void handleOpenChange();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <Modal
      open={toggle.isToggled}
      onOpenChange={handleOpenChange}
      trigger={null}
      title="Join Campaign"
      description="It's time to start your adventure!"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2 py-2"
      >
        <Input
          {...register("invite_id", {
            required: "This field is required",
          })}
          errors={errors}
          placeholder="Invite ID"
          rounded="md"
        />
        <Select
          {...register("character_id", {
            required: "This field is required",
          })}
          rounded="md"
          placeholder="Select a character"
          errors={errors}
        >
          {characters.map((c) => (
            <Select.Item key={c.id} value={c.id}>
              {c.name}
            </Select.Item>
          ))}
        </Select>
        <div className="flex items-center justify-end pt-4">
          <Button disabled={joinGame.isPending} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default JoinCampaignModal;
