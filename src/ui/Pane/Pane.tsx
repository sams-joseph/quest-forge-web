import { cx } from "class-variance-authority";
import React, { type ReactNode } from "react";

interface IPaneProps {
  children: ReactNode;
  classes?: string;
}

const Pane = ({ children, classes }: IPaneProps) => {
  const classNames = cx([
    "from-black-900 to-black-800 rounded-lg bg-gradient-to-t p-[1px]",
    classes,
  ]);
  return (
    <div className={classNames}>
      <div className="rounded-lg bg-black-900">{children}</div>
    </div>
  );
};

export default Pane;
