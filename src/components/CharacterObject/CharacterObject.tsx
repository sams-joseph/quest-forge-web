import React from "react";
import Card from "./Card";
import Row from "./Row";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  CARD: Card,
  ROW: Row,
};

interface CharacterObjectProps {
  displayType: "CARD" | "ROW";
  node: unknown;
}

const CharacterObject = ({
  displayType,
  node,
  ...rest
}: CharacterObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} {...rest} />;
};

export default CharacterObject;
