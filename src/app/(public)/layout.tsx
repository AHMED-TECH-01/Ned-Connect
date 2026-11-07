import type { ReactNode } from "react";
import { Footer, PublicHeader } from "@/components/layout/PublicHeader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
