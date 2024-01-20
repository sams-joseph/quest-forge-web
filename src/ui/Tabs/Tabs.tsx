import { type ReactElement } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

const Tabs = ({
  tabs,
  defaultValue,
  children,
}: {
  tabs: ReactElement;
  defaultValue: string;
  children: ReactElement | string;
}) => (
  <RadixTabs.Root defaultValue={defaultValue} className="flex flex-col gap-4">
    <RadixTabs.List
      aria-label="Manage your account"
      className="flex items-center gap-8"
    >
      {tabs}
    </RadixTabs.List>
    {children}
  </RadixTabs.Root>
);

const Trigger = ({
  value,
  children,
}: {
  value: string;
  children: ReactElement | string;
}) => {
  return (
    <RadixTabs.Trigger
      value={value}
      className="text-md border-b-2 border-transparent py-2 font-bold capitalize text-white opacity-70 data-[state=active]:border-white data-[state=active]:opacity-100"
    >
      {children}
    </RadixTabs.Trigger>
  );
};

const Content = ({
  value,
  children,
}: {
  value: string;
  children: ReactElement | string;
}) => {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>;
};

Tabs.Trigger = Trigger;
Tabs.Content = Content;

Tabs.displayName = "Tabs";

export default Tabs;
