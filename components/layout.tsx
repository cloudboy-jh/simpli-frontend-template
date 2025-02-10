"use client";

import { Header } from "./header";
import { Sidebar } from "./app-sidebar";
import { SidebarProvider } from "./sidebar-provider";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (page) {
      page.classList.remove("page-enter");
      // Force a reflow
      void page.offsetWidth;
      page.classList.add("page-enter");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <div ref={pageRef} className="flex-1 overflow-y-auto p-4 md:p-8 page">
        {children}
      </div>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}