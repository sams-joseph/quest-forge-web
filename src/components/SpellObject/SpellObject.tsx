import React from "react";
import Row from "./Row";
import Card from "./Card";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  ROW: Row,
  CARD: Card,
};

interface QuestObjectProps {
  displayType: "ROW" | "CARD";
  node: unknown;
  refetch?: () => void;
}

const SpellObject = ({
  displayType,
  node,
  refetch,
  ...rest
}: QuestObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} refetch={refetch} {...rest} />;
};

export default SpellObject;
