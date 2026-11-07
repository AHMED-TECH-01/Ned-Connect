"use client";

export function BrandingPanel() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-10 py-16 text-center">
      {/* The NED gate background + dark tint are applied once, page-wide, in
          AuthLayout. This panel stays transparent so the shared image shows
          through continuously (no per-column duplicate / vertical seam). */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* NED University Crest */}
        <div className="mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white/90 p-3 shadow-lg ring-2 ring-white/30">
          <img
            src="/ned-logo.png"
            alt="NED University Crest"
            className="h-full w-full object-contain"
          />
        </div>

        {/* University Name — white text over dark photo */}
        <h2 className="text-[24px] font-extrabold leading-[1.2] tracking-tight text-white sm:text-[28px]">
          NED University of
          <br />
          Engineering &amp; Technology
        </h2>

        {/* Tagline */}
        <p className="mt-6 max-w-[300px] text-[15px] font-medium leading-relaxed text-white/75">
          Building responsible citizens
          <br />
          through technology and innovation.
        </p>
      </div>
    </div>
  );
}
