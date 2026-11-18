"use client";

import {
  trackMetaCustomEvent,
} from "@/lib/tracking/meta-pixel";

export function LandingCta({
  children,
  fullWidth = false,
}: Readonly<{ children: React.ReactNode; fullWidth?: boolean }>) {
  function handleClick() {
    trackMetaCustomEvent("cordelia_cta_clicked", {
      landing: "abc-pensiones-imss",
      action: "scroll_to_registration_form",
    });
    document
      .getElementById("formulario-registro")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full bg-[#2364ca] px-7 py-4 text-sm font-black tracking-wide text-white shadow-lg transition hover:bg-[#3478e0] ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}
