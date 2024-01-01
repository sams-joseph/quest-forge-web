import React from "react";
import Row from "./Row";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  ROW: Row,
};

interface EncounterObjectProps {
  displayType: "ROW";
  node: unknown;
}

const EncounterObject = ({
  displayType,
  node,
  ...rest
}: EncounterObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} {...rest} />;
};

export default EncounterObject;
