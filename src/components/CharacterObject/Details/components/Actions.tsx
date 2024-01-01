import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const Actions = () => {
  return (
    <Tabs.Root className="flex w-full flex-col" defaultValue="tab1">
      <Tabs.List className="bg-black-900 flex shrink-0 gap-4 rounded-lg p-2">
        <Tabs.Trigger
          className="bg-black-950 flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-md px-5 text-[15px] leading-none outline-none data-[state=active]:bg-primary-500"
          value="tab1"
        >
          Actions
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-black-950 flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-md px-5 text-[15px] leading-none outline-none data-[state=active]:bg-primary-500"
          value="tab2"
        >
          Spells
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-black-950 flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-md px-5 text-[15px] leading-none outline-none data-[state=active]:bg-primary-500"
          value="tab3"
        >
          Inventory
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="bg-black-900 mt-4 grow rounded-md p-4"
        value="tab1"
      >
        test
      </Tabs.Content>
      <Tabs.Content
        className="bg-black-900 mt-4 grow rounded-md p-4"
        value="tab2"
      >
        test2
      </Tabs.Content>
      <Tabs.Content
        className="bg-black-900 mt-4 grow rounded-md p-4"
        value="tab3"
      >
        test3
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Actions;
