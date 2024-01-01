import React from "react";
import Row from "./Row";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  ROW: Row,
};

interface QuestObjectProps {
  displayType: "ROW";
  node: unknown;
}

const QuestObject = ({ displayType, node, ...rest }: QuestObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} {...rest} />;
};

export default QuestObject;
