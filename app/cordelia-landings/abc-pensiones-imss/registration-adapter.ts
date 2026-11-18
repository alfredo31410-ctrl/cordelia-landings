"use client";

import { trackMetaEvent } from "@/lib/tracking/meta-pixel";
import { getStoredTraffic, type TrafficData } from "@/lib/tracking/utm";
import { landingConfig } from "./config";

const pendingConfirmationKey = "cordelia_abc_pensiones_imss_pending_confirmation";
const confirmedSubmissionKey = "cordelia_abc_pensiones_imss_confirmed_form_submission";
const pendingConfirmationTtlMs = 30 * 60 * 1000;

export function createConfirmationId() {
  const prefix = "ac-396";
  if (typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function persistRegistrationConfirmation(id: string) {
  try {
    sessionStorage.setItem(pendingConfirmationKey, JSON.stringify({ id, createdAt: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

export function consumeRegistrationConfirmation() {
  try {
    const serialized = sessionStorage.getItem(pendingConfirmationKey);
    sessionStorage.removeItem(pendingConfirmationKey);
    if (!serialized) return null;
    const pending = JSON.parse(serialized) as { id?: unknown; createdAt?: unknown };
    const age = Date.now() - Number(pending.createdAt);
    if (typeof pending.id !== "string" || !pending.id || !Number.isFinite(age) || age < 0 || age > pendingConfirmationTtlMs) return null;
    return pending.id;
  } catch {
    return null;
  }
}

export function prepareActiveCampaignForm(form: HTMLFormElement) {
  const attribution = getStoredTraffic();
  const utmFields: ReadonlyArray<readonly [keyof TrafficData, string]> = [
    ["utm_source", "7"], ["utm_medium", "8"], ["utm_campaign", "9"], ["utm_content", "10"], ["utm_term", "11"],
  ];
  for (const [name, id] of utmFields) {
    const value = attribution[name];
    const field = form.elements.namedItem(`field[${id}]`) ?? form.elements.namedItem(name);
    if (value && field instanceof HTMLInputElement && !field.value) field.value = value;
  }
}

function metaPayload(status: string) {
  return {
    content_name: landingConfig.session.title,
    content_category: "Clase gratuita para asesores de pensiones",
    status,
    value: 0,
    currency: "MXN",
    ...getStoredTraffic(),
  };
}

export function trackConfirmedLead(confirmationId: string) {
  if (!confirmationId) return false;
  try {
    if (sessionStorage.getItem(confirmedSubmissionKey) === confirmationId) return false;
    sessionStorage.setItem(confirmedSubmissionKey, confirmationId);
  } catch {
    // El tracking no bloquea una confirmación de registro válida.
  }
  trackMetaEvent("Lead", metaPayload("form_confirmed"), { eventID: confirmationId });
  return true;
}
