import { useState } from "react";

export interface Toggle {
  isToggled: boolean;
  toggle: () => void;
  toggleOn: () => void;
  toggleOff: () => void;
}

const useToggle = (defaultValue?: boolean) => {
  const [toggled, setToggled] = useState(defaultValue ?? false);

  const toggle = () => setToggled((prev) => !prev);

  const toggleOn = () => setToggled(true);

  const toggleOff = () => setToggled(false);

  return { isToggled: toggled, toggle, toggleOn, toggleOff };
};

export default useToggle;
