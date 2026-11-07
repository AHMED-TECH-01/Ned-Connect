"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import { HeroSceneLoader } from "./HeroSceneLoader";

const nedImageUrl = "/ned-entrance.webp";

export function NedHero() {
  return (
    <section className="ned-hero" aria-label="NED University Campus">
      {/* Layered background: photo → tint → feather */}
      <HeroBackground imageUrl={nedImageUrl} />

      {/* Atmospheric 3D canvas — behind glass, in front of photo */}
      <div className="ned-hero__scene" aria-hidden="true">
        <HeroSceneLoader />
      </div>

      {/* Foreground glass panel with hero content */}
      <div className="ned-hero__content">
        <div className="ned-hero__glass">
          <div className="ned-hero__badge">
            <span className="ned-hero__badge-dot" />
            <span>NED University of Engineering &amp; Technology</span>
          </div>

          <h1 className="ned-hero__title">
            NED Campus
            <br />
            Connect
          </h1>

          <p className="ned-hero__subtitle">
            A Smarter Campus. A Stronger Community.
          </p>

          <p className="ned-hero__description">
            Report issues, find lost items, discover affordable study materials
            and support a cleaner, greener NED — all in one place.
          </p>

          <div className="ned-hero__actions">
            <Link
              href="/signup"
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className: "h-14 px-7 text-[15px] sm:px-10 sm:text-[16px] font-bold rounded-[16px] bg-white text-[#123D2F]! hover:bg-brand-50! hover:text-[#123D2F]! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 shadow-[0_8px_32px_rgba(0,64,47,0.22)]",
              })}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className={buttonStyles({
                variant: "ghost",
                size: "lg",
                className: "h-14 px-8 text-[16px] font-bold rounded-[16px] text-white/90 hover:bg-white/10 hover:text-white border border-white/20",
              })}
            >
              Learn More
            </Link>
          </div>

          <div className="ned-hero__social-proof">
            <div className="ned-hero__avatars" aria-hidden="true">
              {["AR", "ZK", "FM", "HA"].map((initials) => (
                <span key={initials} className="ned-hero__avatar">{initials}</span>
              ))}
            </div>
            <span className="ned-hero__user-count">
              <strong>15,000+</strong> students already connected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
