import React from "react";
import EditableTypography from "@/components/EditableTypography";
import Typography from "@/ui/Typography";
import { cx } from "class-variance-authority";
import Skeleton from "./components/Skeleton";

interface StandardHeroProps {
  title: string;
  metadata?: string;
  media: React.ReactNode;
  editable?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void | undefined;
  backgroundUrl?: string;
  className?: string;
}

const StandardHero = ({
  media,
  title,
  metadata,
  editable,
  onChange,
  backgroundUrl,
  className,
  loading,
}: StandardHeroProps) => {
  const heroClasses = cx([
    "relative flex aspect-hero flex-1 items-end justify-between",
    className,
  ]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div
      className="w-full rounded-md py-4"
      style={{
        background: `linear-gradient(to top,rgba(30, 25, 59,1),rgba(30, 25, 59,0.75)),url('${backgroundUrl}') no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={heroClasses}>
        <div className="flex flex-1 items-center gap-2">
          {media}
          <div className="flex flex-1 flex-col">
            {editable ? (
              <EditableTypography
                initialValue={title ?? ""}
                handleChange={onChange}
                variant="headline"
              />
            ) : (
              <Typography variant="headline">{title}</Typography>
            )}
            {metadata && (
              <Typography variant="caption" color="muted">
                {metadata}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardHero;
