"use client";

import { useState, type ReactNode } from "react";
import {
  DashboardHeader,
  MobileNavigation,
} from "@/components/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-col lg:pl-[270px]">
        <DashboardHeader onOpenNav={() => setNavOpen(true)} />
        <main className="mx-auto w-full max-w-[1220px] flex-1 px-5 py-7 sm:px-7 lg:px-9 lg:py-9">
          {children}
        </main>
      </div>
      <MobileNavigation open={navOpen} onClose={() => setNavOpen(false)} />
    </div>
  );
}
