import React from "react";
import Card from "./Card";
import Row from "./Row";
import Details from "./Details";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  CARD: Card,
  ROW: Row,
  DETAILS: Details,
};

interface CharacterObjectProps {
  displayType: "CARD" | "ROW" | "DETAILS";
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
