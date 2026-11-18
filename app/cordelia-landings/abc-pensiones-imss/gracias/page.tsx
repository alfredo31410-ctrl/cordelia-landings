"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, trackMetaCustomEventImmediate, trackMetaEvent } from "@/lib/tracking/meta-pixel";
import { landingConfig } from "../config";
import { consumeRegistrationConfirmation, trackConfirmedLead } from "../registration-adapter";

export default function GraciasPage() {
  const trackedRef = useRef(false);
  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    initializeMetaPixel(undefined, { trackPageView: false });
    trackMetaEvent("PageView");
    if (new URLSearchParams(window.location.search).get("ac_success") !== "1") return;
    const confirmationId = consumeRegistrationConfirmation();
    if (!confirmationId) return;
    trackConfirmedLead(confirmationId);
  }, []);
  const { session, whatsappGroupUrl } = landingConfig;
  function trackWhatsAppIntent() {
    trackMetaCustomEventImmediate("JoinGroupIntent", {
      content_name: `${session.title} | Grupo de WhatsApp`,
      content_category: "Grupo de WhatsApp",
      landing_slug: landingConfig.name,
      destination: "whatsapp_group",
      status: "clicked",
    });
  }
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#050b17] p-6 text-center text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,#1758bd_0,transparent_40%)]" /><section className="relative mx-auto max-w-2xl"><div className="text-2xl font-black tracking-tight">CORDELIA<span className="block text-xs font-medium tracking-[.18em] text-slate-300">PENSIONES Y ENTRENAMIENTO</span></div><div className="mx-auto mt-10 grid h-20 w-20 place-items-center rounded-full border-2 border-[#79adff] bg-blue-500/20 text-4xl">✓</div><p className="mt-6 font-bold tracking-[.18em] text-[#8bb8ff]">CASI TERMINAS</p><h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Tu registro aún no está completo.</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-200">Ya recibimos tus datos. Para asegurar tu lugar y recibir el acceso a la clase, recordatorios y materiales, falta un último paso: <strong>unirte al grupo de WhatsApp.</strong></p><a className="mt-8 inline-block w-full rounded-full bg-[#2364ca] px-8 py-5 text-lg font-black tracking-wide shadow-[0_0_30px_rgba(52,120,224,.55)] transition hover:bg-[#3478e0]" href={whatsappGroupUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppIntent}>UNIRME AL GRUPO DE WHATSAPP</a><p className="mt-3 text-sm font-semibold text-[#a9caff]">ESTE ES EL PASO FINAL PARA COMPLETAR TU REGISTRO</p><div className="mx-auto mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 text-left backdrop-blur"><p className="font-bold text-[#a9caff]">Tu clase gratuita</p><p className="mt-2 text-xl font-extrabold">{session.date}</p><p className="text-slate-200">{session.time} · En vivo y en línea</p></div></section></main>;
}
