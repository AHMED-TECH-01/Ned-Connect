import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandingPanel } from "@/components/layout/BrandingPanel";
import { BrandWordmark } from "@/components/layout/Brand";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  variant?: "split" | "centered";
  children: ReactNode;
}

export function AuthLayout({ variant = "split", children }: AuthLayoutProps) {
  if (variant === "centered") {
    return (
      <div className="relative flex min-h-screen flex-col bg-page">
        <div className="relative z-10 flex min-h-screen flex-col">
          <TopBar />
          <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full max-w-[480px]">{children}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-brand-950">
      <div className="relative flex flex-1 flex-col lg:flex-row">
        {/* ONE continuous NED gate background across the whole viewport.
            The image + dark tint + vignette are applied a single time here so
            the branding column and the form column never crop two independent
            copies of the gate (that duplication caused the vertical seam). */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/ned-entrance.webp)" }}
          />
          {/* Dark green -> blue tint — one smooth continuous gradient (darker
              green top-left behind the branding, cooler blue bottom-right behind
              the form) so the background looks polished with no vertical seam. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(4,38,30,0.85) 0%, rgba(7,32,45,0.62) 55%, rgba(10,26,58,0.5) 100%)",
            }}
          />
          {/* Soft dark vignette at the top/bottom edges — no white wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,38,30,0.35) 0%, transparent 30%, transparent 72%, rgba(4,38,30,0.55) 100%)",
            }}
          />
        </div>

        {/* Left: branding — transparent, so the shared background shows through */}
        <aside className="relative z-10 hidden lg:flex lg:w-[42%] xl:w-[45%]">
          <BrandingPanel />
        </aside>

        {/* Right: form — transparent over the shared background, keeps the glass card */}
        <main className="relative z-10 flex flex-1 flex-col">
          <TopBar />
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
            {/* mx-auto centers the card independently of the parent's justify-* */}
            <div className="mx-auto w-full max-w-[440px]">
              {/* Strong glass panel — form stays readable over photo */}
              <div className="glass-panel-form p-10 sm:p-12">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="relative z-20 flex h-20 items-center justify-between px-6 sm:px-8">
      <Link href="/" aria-label="NED Campus Connect home" className="lg:hidden">
        <BrandWordmark size={36} />
      </Link>
      <div className="hidden lg:block" />
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[13px] font-bold text-white backdrop-blur-sm transition-all hover:bg-white/25 hover:border-white/50 shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}

export function AuthCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full", className)}
    >
      {children}
    </div>
  );
}

export interface AuthHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  icon?: ReactNode;
}

export function AuthHeading({
  eyebrow,
  title,
  description,
  align = "left",
  icon,
}: AuthHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {icon ? (
        <span
          className={cn(
            "mb-8 inline-flex h-20 w-20 items-center justify-center rounded-[24px] bg-brand-700 text-white shadow-md ring-4 ring-brand-50/50",
            align === "center" && "mx-auto"
          )}
        >
          {icon}
        </span>
      ) : null}
      {eyebrow ? (
        <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-brand-700 mb-3">
          {eyebrow}
        </p>
      ) : null}
      {/* Dark ink text — readable on strong glass panel */}
      <h1 className="text-[36px] font-black leading-[1.05] tracking-tight text-[#001a14] sm:text-[44px]">
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[17px] font-medium leading-relaxed text-[#00402F]/70",
            align === "center" && "mx-auto max-w-sm"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
