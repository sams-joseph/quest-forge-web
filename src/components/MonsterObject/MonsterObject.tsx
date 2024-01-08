import React from "react";
import Row from "./Row";
import Drawer from "./Drawer";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  ROW: Row,
  DRAWER: Drawer,
};

interface MonsterObjectProps {
  displayType: "ROW" | "DRAWER";
  node: unknown;
  refetch?: () => void;
  onClick?: () => void;
  onClose?: () => void;
}

const MonsterObject = ({
  displayType,
  node,
  refetch,
  ...rest
}: MonsterObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} refetch={refetch} {...rest} />;
};

export default MonsterObject;
