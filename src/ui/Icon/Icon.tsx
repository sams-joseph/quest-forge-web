import React, { type ElementType, type ReactNode } from "react";
import {
  PlusIcon,
  Cross1Icon,
  BoxModelIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ThickArrowRightIcon,
  ThickArrowLeftIcon,
  CardStackIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import Spinner from "./library/Spinner";

type IIconMap = Record<string, ElementType>;

const IconMap: IIconMap = {
  Bolt: BoxModelIcon,
  Close: Cross1Icon,
  Check: CheckIcon,
  Plus: PlusIcon,
  ArrowRight: ThickArrowRightIcon,
  ArrowLeft: ThickArrowLeftIcon,
  ChevronRight: ChevronRightIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,
  CardStack: CardStackIcon,
  Loading: Spinner,
  Moon: MoonIcon,
};

interface IIconProps {
  iconName?: string;
  className?: string;
  children?: ReactNode;
}

const Icon = ({ iconName = "Bolt", ...rest }: IIconProps) => {
  const Component: ElementType = IconMap[iconName] ?? "div";

  return <Component {...rest} />;
};

export default Icon;
