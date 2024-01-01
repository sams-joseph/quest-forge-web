import { type ReactNode } from "react";
import AppHeader from "@/components/AppHeader";

interface ILayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: ILayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <AppHeader />
      <main
        id="main-scroll-area"
        className="relative flex flex-1 flex-col gap-4 overflow-scroll bg-cover p-4"
      >
        {children}
      </main>
    </div>
  );
}
