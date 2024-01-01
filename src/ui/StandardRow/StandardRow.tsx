import React from "react";
import Typography from "@/ui/Typography";
import EditableTypography from "@/components/EditableTypography";
import Link from "next/link";
import { cx } from "class-variance-authority";

interface StandardRowProps {
  title: string;
  text?: string | React.ReactNode;
  metadata?: string;
  media?: React.ReactNode;
  editable?: boolean;
  to?: string;
  onChange?: (value: string) => void | undefined;
}

const Wrapper = ({
  to,
  children,
}: {
  to?: string;
  children: React.ReactNode;
}) => {
  if (!to) {
    return <>{children}</>;
  }

  return <Link href={to}>{children}</Link>;
};

const StandardRow = ({
  title,
  text,
  metadata,
  media,
  editable,
  onChange,
  to,
}: StandardRowProps) => {
  const wrapper = cx([
    "flex gap-4 overflow-hidden rounded-md bg-black-900 p-4 hover:bg-black-800",
    text ? "items-start" : "items-center",
  ]);
  return (
    <Wrapper to={to}>
      <div className={wrapper}>
        {media}
        <div className="flex-1">
          <div className="flex-1">
            {editable ? (
              <EditableTypography
                initialValue={title ?? ""}
                handleChange={onChange}
                variant="subtitle2"
              />
            ) : (
              <Typography variant="subtitle2">{title}</Typography>
            )}
          </div>
          {text}
          <Typography variant="caption" color="muted">
            {metadata}
          </Typography>
        </div>
      </div>
    </Wrapper>
  );
};

export default StandardRow;
