import React from "react";
import Card from "./Card";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  CARD: Card,
};

interface GameObjectProps {
  displayType: "CARD";
  node: unknown;
}

const GameObject = ({ displayType, node, ...rest }: GameObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} {...rest} />;
};

export default GameObject;
