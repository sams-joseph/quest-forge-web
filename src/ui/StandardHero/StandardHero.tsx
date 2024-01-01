import React from "react";
import EditableTypography from "@/components/EditableTypography";
import Typography from "@/ui/Typography";

interface StandardHeroProps {
  title: string;
  media: React.ReactNode;
  editable?: boolean;
  onChange?: (value: string) => void | undefined;
  backgroundUrl?: string;
}

const StandardHero = ({
  media,
  title,
  editable,
  onChange,
  backgroundUrl,
}: StandardHeroProps) => {
  return (
    <div
      className="w-full rounded-md py-4"
      style={{
        background: `linear-gradient(to top,rgba(30, 25, 59,1),rgba(30, 25, 59,0.75)),url('${backgroundUrl}') no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="aspect-hero relative flex flex-1 items-end justify-between">
        <div className="flex flex-1 items-center gap-2">
          {media}
          {editable ? (
            <EditableTypography
              initialValue={title ?? ""}
              handleChange={onChange}
              variant="headline"
            />
          ) : (
            <Typography variant="headline">{title}</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardHero;
