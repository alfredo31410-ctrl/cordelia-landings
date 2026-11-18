"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef } from "react";
import {
  createConfirmationId,
  persistRegistrationConfirmation,
  prepareActiveCampaignForm,
} from "@/app/cordelia-landings/abc-pensiones-imss/registration-adapter";

export function ActiveCampaignAbcPensionesForm() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const prepare = () => {
      const form = host.querySelector<HTMLFormElement>("form");
      if (form) prepareActiveCampaignForm(form);
    };
    prepare();
    const observer = new MutationObserver(prepare);
    observer.observe(host, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  function handleSubmitCapture(event: FormEvent<HTMLDivElement>) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.checkValidity()) return;
    persistRegistrationConfirmation(createConfirmationId());
  }

  return (
    <div ref={hostRef} onSubmitCapture={handleSubmitCapture}>
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
