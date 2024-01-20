import React, { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import IconButton from "@/ui/IconButton";

interface IDrawerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Drawer = React.forwardRef<HTMLDivElement, IDrawerProps>(
  ({ children, description, title, open, onOpenChange }: IDrawerProps, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black-950 bg-opacity-50" />
          <Dialog.Content
            ref={ref}
            className="fixed bottom-0 right-0 top-0 z-10 w-full md:max-w-md lg:max-w-xl"
          >
            <div className="h-screen rounded-none border-l border-black-800 bg-black-900 shadow-xl shadow-black-950">
              <div className="flex h-screen flex-col">
                <div className="flex flex-col gap-2 border-b border-black-950 p-4">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl">{title}</Dialog.Title>
                    <Dialog.Close asChild>
                      <IconButton iconName="Close" elevation="md" />
                    </Dialog.Close>
                  </div>
                  <div>
                    {description && (
                      <Dialog.Description className="text-md text-black-200">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-scroll p-4">{children}</div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Drawer.displayName = "Drawer";

export default Drawer;
