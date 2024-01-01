import React, { useMemo, useState } from "react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import useFetchClasses, { type Class } from "@/hooks/useFetchClasses";
import useFetchRaces, { type Race } from "@/hooks/useFetchRaces";
import useFetchBackgrounds, {
  type Background,
} from "@/hooks/useFetchBackgrounds";
import useCreateCharacter from "@/hooks/useCreateCharacter";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  class_id: string;
  race_id: string;
  background_id: string;
};

const CreateCharacterModal = () => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      class_id: "",
      race_id: "",
      background_id: "",
    },
  });

  const { data: classData } = useFetchClasses();
  const { data: raceData } = useFetchRaces();
  const { data: backgroundData } = useFetchBackgrounds();

  const createCharacter = useCreateCharacter();

  const classes: Class[] = useMemo(() => {
    if (classData?.pages) {
      return classData.pages.flatMap((page) => page.data as Class[]);
    }

    return [];
  }, [classData]);

  const races: Race[] = useMemo(() => {
    if (raceData?.pages) {
      return raceData.pages.flatMap((page) => page.data as Race[]);
    }

    return [];
  }, [raceData]);

  const backgrounds: Background[] = useMemo(() => {
    if (backgroundData?.pages) {
      return backgroundData.pages.flatMap((page) => page.data as Background[]);
    }

    return [];
  }, [backgroundData]);

  const handleOpenChange = (value: boolean) => {
    reset();
    setOpen(value);
  };

  const submit: SubmitHandler<Inputs> = async (data) => {
    try {
      await toast.promise(createCharacter.mutateAsync(data), {
        loading: "Creating character...",
        success: "Character created",
        error: "Error creating character",
      });

      void handleOpenChange(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response?.data);
      }
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      trigger={
        <Button size="medium" rounded="md" iconName="Plus">
          Character
        </Button>
      }
      title="New Character"
      description="Let's start building your character!"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2 py-2"
      >
        <Input
          {...register("name", {
            required: "This field is required",
          })}
          errors={errors}
          placeholder="Name"
          rounded="md"
        />
        <Select
          {...register("class_id", {
            required: "This field is required",
          })}
          rounded="md"
          placeholder="Select a class"
          errors={errors}
        >
          {classes.map((c) => (
            <Select.Item key={c.id} value={c.id}>
              {c.name}
            </Select.Item>
          ))}
        </Select>
        <Select
          {...register("race_id", {
            required: "This field is required",
          })}
          rounded="md"
          placeholder="Select a race"
          errors={errors}
        >
          {races.map((c) => (
            <Select.Item key={c.id} value={c.id}>
              {c.name}
            </Select.Item>
          ))}
        </Select>
        <Select
          {...register("background_id", {
            required: "This field is required",
          })}
          rounded="md"
          placeholder="Select a background"
          errors={errors}
        >
          {backgrounds.map((c) => (
            <Select.Item key={c.id} value={c.id}>
              {c.name}
            </Select.Item>
          ))}
        </Select>
        <div className="flex items-center justify-end pt-4">
          <Button disabled={createCharacter.isPending} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCharacterModal;
