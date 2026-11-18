import type { Metadata } from "next";
import Image from "next/image";
import { ActiveCampaignAbcPensionesForm } from "@/components/forms/ActiveCampaignAbcPensionesForm";
import { LandingCta } from "./tracking";
import { landingConfig } from "./config";

export const metadata: Metadata = {
  title: landingConfig.title,
  description: landingConfig.description,
};

const benefits = [
  [
    "01",
    "Revisa el reporte antes de orientar",
    "Identifica qué revisar en el reporte de semanas cotizadas antes de responder a un cliente.",
  ],
  [
    "02",
    "Entiende las variables del análisis",
    "Conoce cómo influyen edad, semanas, salario e historial de cotización en un primer análisis.",
  ],
  [
    "03",
    "Inicia un prediagnóstico ordenado",
    "Descubre qué preguntas hacer para reconocer qué información falta y cuándo profundizar un caso.",
  ],
] as const;

export default function AbcPensionesImssLanding() {
  const { session } = landingConfig;
  return (
    <main className="overflow-hidden bg-[#f5f7fb] text-[#07152c]">
      <section className="relative isolate overflow-hidden bg-[#050b17] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,#1758bd_0,transparent_31%),radial-gradient(circle_at_15%_85%,#0c3475_0,transparent_35%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:py-16">
          <div className="max-w-2xl">
            <Image
              src="/logos/Logotipo%20CORDELIA%20blanco.png"
              alt="Cordelia, Pensiones y Entrenamiento"
              width={272}
              height={74}
              unoptimized
              className="h-auto w-56"
            />
            <div className="mt-10 inline-flex rounded-md border border-blue-300/30 bg-[#17438a] px-4 py-2 text-sm font-black tracking-wide">
              CLASE GRATUITA EN VIVO PARA CONTADORES, ABOGADOS Y ASESORES
            </div>
            <p className="mt-7 text-lg font-bold text-[#8bb8ff]">
              TU CLIENTE TE PREGUNTA:
            </p>
            <h1 className="mt-3 text-4xl font-black leading-[.98] tracking-tight sm:text-6xl">
              “¿CUÁNTO ME TOCA DE PENSIÓN?”
              <br />
              <span className="text-[#5fa3ff]">¿SABES POR DÓNDE EMPEZAR?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
              Aprende qué revisar antes de responder y descubre cómo dar tus
              primeros pasos en la asesoría de pensiones IMSS.
            </p>
            <p className="mt-6 font-bold text-white">
              {session.title}{" "}
              <span className="font-medium text-slate-300">
                · Con {session.presenter}
              </span>
            </p>
            <p className="mt-2 font-semibold text-[#a9caff]">
              {session.date} · {session.time}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LandingCta>QUIERO REGISTRARME GRATIS</LandingCta>
              <span className="text-sm font-semibold text-slate-200">
                EN LÍNEA · NIVEL INICIAL · SIN EXPERIENCIA PREVIA
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-blue-100 bg-white px-6 py-7">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-black uppercase tracking-wide text-[#0a2760]">
            {session.title}{" "}
            <span className="font-medium text-slate-600">
              · {session.presenter}
            </span>
          </p>
          <p className="font-bold text-[#124a9b]">
            {session.date} · {session.time}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="font-bold tracking-[.18em] text-[#1661c7]">
            MÁS QUE NÚMEROS
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            Tener los datos no es saber interpretarlos.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Dos personas pueden tener la misma edad y las mismas semanas
            cotizadas, pero no necesariamente el mismo resultado. Aprende por
            dónde empezar a analizar.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(([number, title, description]) => (
            <article
              key={number}
              className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm"
            >
              <span className="text-sm font-black text-[#1760c5]">
                {number}
              </span>
              <h3 className="mt-6 text-2xl font-extrabold">{title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
        <div className="mt-14 rounded-3xl bg-[#e9f1ff] px-6 py-10 text-center sm:px-10">
          <p className="text-3xl font-black text-[#07152c]">
            Tus clientes ya te consultan sobre su retiro.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Conoce las bases para atender esas preguntas con una entrevista
            ordenada, identificar información indispensable y reconocer los
            casos que requieren un análisis más profundo.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-semibold text-[#0a2760]">
            Descubre si la asesoría de pensiones puede convertirse en tu
            siguiente línea de servicios.
          </p>
          <div className="mt-6">
            <LandingCta>QUIERO REGISTRARME GRATIS</LandingCta>
          </div>
        </div>
      </section>
      <section className="bg-[#07152c] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-bold tracking-[.18em] text-[#75aeff]">
            VERÁS CÓMO EMPEZAR A REVISAR UN CASO
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight">
            Antes de hablar de una posible pensión, hay que saber qué preguntar.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A partir de un perfil de ejemplo, identificarás qué información
            tenemos, qué falta y qué debemos preguntar antes de orientar.
            Conocerás el alcance inicial de Ley 73, Ley 97 y Modalidades 40 y
            10.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 text-left text-lg font-semibold sm:grid-cols-2">
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              ✓ Reporte de semanas cotizadas
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              ✓ Edad, salario e historial
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              ✓ Ley 73, Ley 97 y Modalidades 40 y 10
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-4">
              ✓ Preguntas para un prediagnóstico
            </li>
          </ul>
          <div className="mt-10">
            <LandingCta>QUIERO REGISTRARME GRATIS</LandingCta>
          </div>
        </div>
      </section>
      <section
        id="registro"
        className="scroll-mt-8 bg-[linear-gradient(135deg,#0e3f93,#1264d3)] px-6 py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="text-white">
            <p className="font-bold tracking-[.18em] text-blue-200">
              RESERVA TU LUGAR
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              Da tu primer paso como asesor de pensiones.
            </h2>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              Regístrate sin costo y recibe la confirmación e indicaciones de
              acceso en tu correo y WhatsApp.
            </p>
            <div className="mt-8 border-l-2 border-blue-200 pl-5 font-semibold">
              <p>{session.date}</p>
              <p>{session.time}</p>
              <p className="mt-2 text-blue-100">En vivo · En línea · Gratis</p>
            </div>
          </div>
          <div
            id="formulario-registro"
            className="scroll-mt-8 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <h3 className="text-2xl font-black text-[#07152c]">
              Regístrate para la clase gratuita
            </h3>
            <p className="mt-2 text-slate-600">
              Completa tus datos para continuar. No necesitas experiencia previa
              en pensiones.
            </p>
            <div className="mt-6">
              <ActiveCampaignAbcPensionesForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
