import React, { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import IconButton from "@/ui/IconButton";
import Pane from "@/ui/Pane";

interface IModalProps {
  children: ReactNode;
  trigger: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Modal = React.forwardRef<HTMLDivElement, IModalProps>(
  (
    { trigger, children, description, title, open, onOpenChange }: IModalProps,
    ref,
  ) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black fixed inset-0 bg-opacity-30" />
          <Dialog.Content
            ref={ref}
            className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
          >
            <Pane classes="shadow-xl shadow-black-950">
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl">{title}</Dialog.Title>
                  <Dialog.Close asChild>
                    <IconButton iconName="Close" elevation="md" />
                  </Dialog.Close>
                </div>
                {description && (
                  <Dialog.Description className="text-md text-black-200">
                    {description}
                  </Dialog.Description>
                )}
                {children}
              </div>
            </Pane>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
