import Link from "next/link";
import { LifeBuoy, LogOut } from "lucide-react";
import { BrandMark } from "@/components/layout/Brand";
import { DashboardNavList } from "@/components/layout/DashboardNavList";
import { Avatar } from "@/components/ui/Avatar";
import { BRAND, currentStudent } from "@/lib/mock-data";

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] flex-col bg-[#00402F] lg:flex">
      <div className="flex h-18 shrink-0 items-center gap-3 border-b border-white/10 px-6">
        <BrandMark size={40} />
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-extrabold leading-tight text-white">
            {BRAND.name}
          </span>
          <span className="block truncate text-[11px] font-medium leading-tight text-brand-300">
            {BRAND.tagline}
          </span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <DashboardNavList />
      </div>

      <div className="shrink-0 space-y-3 border-t border-white/10 p-4">
        <Link
          href="/#about"
          className="flex items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2.5 text-[12.5px] font-semibold text-brand-100 transition-colors hover:bg-white/[0.14] hover:text-white"
        >
          <LifeBuoy className="h-4 w-4" strokeWidth={1.85} />
          Help &amp; support
        </Link>
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-3 py-3">
          <Avatar initials={currentStudent.initials} name={currentStudent.name} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold text-white">
              {currentStudent.name}
            </span>
            <span className="block truncate text-[11px] text-brand-300">
              {currentStudent.department}
            </span>
          </span>
          <Link
            href="/login"
            aria-label="Log out"
            className="rounded-lg p-2 text-brand-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
