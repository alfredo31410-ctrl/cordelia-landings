"use client";

import Script from "next/script";
import { FormEvent } from "react";
import { prepareCordeliaLead } from "@/lib/tracking/meta-pixel";

export function ActiveCampaignAbcPensionesForm() {
  function handleSubmitCapture(event: FormEvent<HTMLDivElement>) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.checkValidity()) return;
    const email = form.querySelector<HTMLInputElement>('input[type="email"], input[name*="email" i]')?.value;
    const phone = form.querySelector<HTMLInputElement>('input[type="tel"], input[name*="phone" i], input[name*="telefono" i]')?.value;
    prepareCordeliaLead(email, phone);
  }

  return (
    <div onSubmitCapture={handleSubmitCapture}>
      <div className="_form_396" />
      <Script
        id="activecampaign-form-396"
        src="https://cefincapacitacion.activehosted.com/f/embed.php?id=396"
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </div>
  );
}
