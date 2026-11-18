"use client";

import { trackMetaCustomEvent, trackMetaEvent } from "@/lib/tracking/meta-pixel";

export function LandingCta({ children }: Readonly<{ children: React.ReactNode }>) {
  function handleClick() {
    trackMetaEvent("InitiateCheckout", { content_name: "cordelia_abc_pensiones_imss" });
    trackMetaCustomEvent("cordelia_cta_clicked", { landing: "abc-pensiones-imss" });
    document.getElementById("formulario-registro")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return <button type="button" onClick={handleClick} className="rounded-full bg-[#2364ca] px-7 py-4 text-sm font-black tracking-wide text-white shadow-lg transition hover:bg-[#3478e0]">{children}</button>;
}
