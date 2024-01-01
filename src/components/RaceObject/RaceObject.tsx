import React from "react";
import Row from "./Row";

const DISPLAY_MAP: Record<string, React.ElementType> = {
  ROW: Row,
};

interface RaceObjectProps {
  displayType: "ROW";
  node: unknown;
  refetch?: () => void;
}

const RaceObject = ({
  displayType,
  node,
  refetch,
  ...rest
}: RaceObjectProps) => {
  const Component = DISPLAY_MAP[displayType];

  if (!Component) {
    return null;
  }

  return <Component node={node} refetch={refetch} {...rest} />;
};

export default RaceObject;
