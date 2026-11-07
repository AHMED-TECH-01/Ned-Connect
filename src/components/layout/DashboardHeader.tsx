"use client";

import Link from "next/link";
import { Bell, Menu, Search, X } from "lucide-react";
import { BrandMark } from "@/components/layout/Brand";
import { DashboardNavList } from "@/components/layout/DashboardNavList";
import { Avatar } from "@/components/ui/Avatar";
import { BRAND, currentStudent } from "@/lib/mock-data";

export interface DashboardHeaderProps {
  onOpenNav: () => void;
  notificationCount?: number;
}

export function DashboardHeader({
  onOpenNav,
  notificationCount = 3,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-line bg-surface px-6 sm:px-8">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="rounded-xl border border-line p-2.5 text-ink transition-colors hover:bg-page lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Showcase Search Bar Style */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted/60"
          aria-hidden
        />
        <input
          type="search"
          aria-label="Search everything"
          placeholder="Search anything..."
          className="h-12 w-full rounded-2xl border border-line/60 bg-page/40 pl-11 pr-4 text-[14px] text-ink placeholder:text-muted/50 transition-all hover:border-line focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/5"
        />
      </div>

      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        {/* Showcase Notification Style */}
        <Link
          href="/notifications"
          aria-label={`Notifications, ${notificationCount} unread`}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line/60 bg-surface text-muted transition-all hover:bg-page hover:text-brand-700"
        >
          <Bell className="h-5 w-5" strokeWidth={2} />
          {notificationCount > 0 ? (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white ring-2 ring-white">
              {notificationCount}
            </span>
          ) : null}
        </Link>

        <div className="hidden h-10 w-px bg-line/60 sm:block" />

        <Link
          href="/profile"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-bold leading-tight text-ink">
              {currentStudent.name}
            </p>
            <p className="text-[11px] font-medium leading-tight text-muted/80">
              NED Student
            </p>
          </div>
          <Avatar initials={currentStudent.initials} name={currentStudent.name} size="md" className="ring-2 ring-brand-50" />
        </Link>
      </div>
    </header>
  );
}

export interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-brand-950/40 backdrop-blur-[2px]"
      />
      <div className="animate-slide-in absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col bg-brand-900 shadow-2xl">
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <BrandMark size={36} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-extrabold leading-tight text-white">
              {BRAND.name}
            </span>
            <span className="block truncate text-[11px] font-medium leading-tight text-brand-200/60">
              {BRAND.tagline}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-xl p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <DashboardNavList onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
