"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/layout/Brand";
import { buttonStyles } from "@/components/ui/Button";
import { publicNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(4,38,30,0.55)] backdrop-blur-[16px] saturate-[1.4]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="NED Campus Connect home">
          <BrandWordmark size={38} tone="light" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {publicNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/login"
            className={buttonStyles({
              variant: "ghost",
              size: "sm",
              className: "text-[14px] font-bold text-white/90 hover:bg-white/10 hover:text-white",
            })}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={buttonStyles({
              variant: "primary",
              size: "sm",
              className: "rounded-full bg-white px-5 text-[14px] font-bold text-brand-800! hover:bg-brand-50 hover:text-brand-800! shadow-md",
            })}
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-white/20 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open ? (
        <div className="animate-fade-in border-t border-white/10 bg-[rgba(4,38,30,0.88)] backdrop-blur-[16px] px-4 pb-5 pt-3 sm:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {publicNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={cn(buttonStyles({ variant: "outline" }), "w-full border-white/20 text-white hover:bg-white/10")}
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className={cn(buttonStyles({ variant: "primary" }), "w-full")}
            >
              Sign Up
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export interface FooterProps {
  /** Marketing footer for public pages; compact footer for auth pages. */
  compact?: boolean;
}

export function Footer({ compact = false }: FooterProps) {
  if (compact) {
    return (
      <footer className="bg-white border-t border-line px-4 py-8 text-center sm:px-6">
        <p className="text-[13px] font-medium text-muted">
          © {new Date().getFullYear()} NED Campus Connect · Together for a Better Campus
        </p>
      </footer>
    );
  }

  return (
    <footer className="bg-[#00402F] py-10 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-4">
          {/* Left: Brand Name */}
          <div className="text-[18px] font-bold tracking-tight">
            NED Campus Connect
          </div>

          {/* Center: University Logo and Tagline */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-lg">
              <img src="/ned-logo.png" alt="NED University" className="h-full w-full object-contain" />
            </div>
            <div className="text-[15px] font-medium text-white/80">
              Together for a Better Campus
            </div>
          </div>

          {/* Right: University Name */}
          <div className="text-right text-[14px] font-medium text-white/70 lg:max-w-[240px]">
            NED University of
            <br />
            Engineering & Technology
          </div>
        </div>
      </div>
    </footer>
  );
}
