import { CORDELIA_META_PIXEL_ID } from "@/lib/tracking/config";

export type MetaEventPayload = Record<string, unknown>;

type MetaPixelRuntime = ((command: string, ...args: unknown[]) => void) & {
  callMethod?: (command: string, ...args: unknown[]) => void;
  queue: unknown[][];
  push: (command: string, ...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    _fbq?: (command: string, ...args: unknown[]) => void;
    __cordeliaMetaPixelInitialized?: boolean;
  }
}

/** Replica el cargador de Meta de la landing IMSS de referencia. */
export function initializeMetaPixel(
  pixelId = CORDELIA_META_PIXEL_ID,
  { trackPageView = true }: { trackPageView?: boolean } = {},
) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq !== "function") {
    const fbq = function metaPixelQueue(command: string, ...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(command, ...args);
        return;
      }
      fbq.queue.push([command, ...args]);
    } as MetaPixelRuntime;

    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.cordeliaMetaPixel = "true";
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else document.head.appendChild(script);
  }

  if (!window.__cordeliaMetaPixelInitialized && window.fbq) {
    window.fbq("init", pixelId);
    if (trackPageView) window.fbq("track", "PageView");
    window.__cordeliaMetaPixelInitialized = true;
  }
}

function runWhenMetaPixelReady(callback: () => void, attempts = 20) {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    callback();
    return;
  }
  if (attempts > 0) window.setTimeout(() => runWhenMetaPixelReady(callback, attempts - 1), 150);
}

export function trackMetaEvent(event: string, data?: MetaEventPayload, options?: MetaEventPayload) {
  runWhenMetaPixelReady(() => {
    if (!window.fbq) return;
    if (data && options) window.fbq("track", event, data, options);
    else if (data) window.fbq("track", event, data);
    else window.fbq("track", event);
  });
}

export function trackMetaCustomEventImmediate(event: string, data?: MetaEventPayload) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (data) window.fbq("trackCustom", event, data);
  else window.fbq("trackCustom", event);
}
