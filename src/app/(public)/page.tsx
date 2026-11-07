import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Recycle,
  SearchCheck,
  Wrench,
} from "lucide-react";
import { NedHero } from "@/components/hero/NedHero";
import { FeatureCard } from "@/components/ui/FeatureCard";

const features = [
  {
    icon: SearchCheck,
    title: "Lost & Found",
    action: "Recover what matters",
    href: "/lost-found",
    iconBg: "bg-[#0284c7]",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    action: "Report campus issues",
    href: "/maintenance",
    iconBg: "bg-[#f59e0b]",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    action: "Buy, Sell, Exchange",
    href: "/study-materials",
    iconBg: "bg-[#6366f1]",
  },
  {
    icon: Recycle,
    title: "Recycling",
    action: "A cleaner campus",
    href: "/recycling",
    iconBg: "bg-[#16a34a]",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Full-bleed NED entrance hero with glassmorphism + 3D scene */}
      <NedHero />

      {/* Feature Cards Section — glassmorphism panel */}
      <section id="features" className="ned-features">
        <div className="mx-auto max-w-6xl">
          <div className="ned-features__glass">
            <div className="mb-12 text-center">
              <h2 className="text-[34px] font-black tracking-tight text-ink sm:text-[42px]">
                Everything you need, in one place.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[16px] font-medium text-muted">
                Four powerful tools designed to make campus life easier, safer, and more connected.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.href}
                  icon={feature.icon}
                  title={feature.title}
                  action={feature.action}
                  href={feature.href}
                  iconBg={feature.iconBg}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner — glass panel */}
      <section className="bg-[#f4f8f6] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass-panel grid gap-6 p-8 sm:grid-cols-3 sm:p-10">
            {[
              { value: "15,000+", label: "Active Students" },
              { value: "4", label: "Campus Modules" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[36px] font-black tracking-tight text-brand-700">
                  {stat.value}
                </p>
                <p className="mt-1 text-[14px] font-semibold text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#00402F] py-20">
        <div className="mx-auto max-w-4xl text-center px-6">
          <h2 className="text-[34px] font-black tracking-tight text-white sm:text-[44px]">
            Ready to make campus better?
          </h2>
          <p className="mt-5 text-[17px] font-medium text-brand-200">
            Join thousands of students already using NED Campus Connect to stay connected, report issues, and share resources.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-[16px] bg-white px-8 py-4 text-[15px] font-bold text-brand-800 shadow-lg transition-all hover:bg-brand-50 hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-[16px] border border-white/30 bg-white/10 px-8 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
