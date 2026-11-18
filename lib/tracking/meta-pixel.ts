export type PixelEventName = "PageView" | "ViewContent" | "Lead" | "InitiateCheckout" | string;
export type PixelEventParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(event: PixelEventName, parameters?: PixelEventParameters) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, parameters);
}

export function trackMetaCustomEvent(event: string, parameters?: PixelEventParameters) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, parameters);
}
