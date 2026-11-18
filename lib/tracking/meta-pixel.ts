import { CORDELIA_META_PIXEL_ID } from "@/lib/tracking/config";

export type MetaStandardEventName = "PageView" | "Lead";
export type PixelEventParameters = Record<string, string | number | boolean | undefined>;
type MetaAdvancedMatching = { em?: string; ph?: string };

const PENDING_LEAD_STORAGE_KEY = "cordelia_pending_lead";
const LAST_LEAD_EVENT_ID_STORAGE_KEY = "cordelia_last_lead_event_id";
const LEAD_SENT_STORAGE_KEY = "cordelia_abc_pensiones_imss_lead_sent";

type PendingLeadEvent = {
  eventId: string;
  createdAt: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function createMetaEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackMetaStandardEvent(event: MetaStandardEventName, parameters?: PixelEventParameters, eventId?: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventId) {
    window.fbq("track", event, parameters ?? {}, { eventID: eventId });
    return;
  }
  window.fbq("track", event, parameters ?? {});
}

function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();
  return email || undefined;
}

function normalizeMexicanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return undefined;
  return digits.startsWith("52") ? digits : `52${digits}`;
}

function configureAdvancedMatching(email?: string, phone?: string) {
  const matching: MetaAdvancedMatching = {
    em: email ? normalizeEmail(email) : undefined,
    ph: phone ? normalizeMexicanPhone(phone) : undefined,
  };
  if (typeof window === "undefined" || !window.fbq || (!matching.em && !matching.ph)) return;
  window.fbq("init", CORDELIA_META_PIXEL_ID, matching);
}

export function prepareCordeliaLead(email?: string, phone?: string) {
  const eventId = createMetaEventId();
  configureAdvancedMatching(email, phone);
  sessionStorage.setItem(PENDING_LEAD_STORAGE_KEY, JSON.stringify({ eventId, createdAt: Date.now() } satisfies PendingLeadEvent));
  return eventId;
}

export function consumeCordeliaLeadEventId() {
  try {
    const raw = sessionStorage.getItem(PENDING_LEAD_STORAGE_KEY);
    if (!raw) return undefined;
    const pending = JSON.parse(raw) as PendingLeadEvent;
    sessionStorage.removeItem(PENDING_LEAD_STORAGE_KEY);
    if (!pending.eventId || Date.now() - pending.createdAt > 15 * 60 * 1000) return undefined;
    sessionStorage.setItem(LAST_LEAD_EVENT_ID_STORAGE_KEY, pending.eventId);
    return pending.eventId;
  } catch {
    return undefined;
  }
}

export function trackCordeliaLeadAfterSuccessRedirect() {
  if (sessionStorage.getItem(LEAD_SENT_STORAGE_KEY)) return;
  const eventId = consumeCordeliaLeadEventId() ?? createMetaEventId();
  trackMetaStandardEvent("Lead", { content_name: "cordelia_abc_pensiones_imss" }, eventId);
  sessionStorage.setItem(LEAD_SENT_STORAGE_KEY, eventId);
}

/** Event ID preserved for a future Conversions API implementation; contains no personal data. */
export function getLastCordeliaLeadEventId() {
  return sessionStorage.getItem(LAST_LEAD_EVENT_ID_STORAGE_KEY) ?? undefined;
}
