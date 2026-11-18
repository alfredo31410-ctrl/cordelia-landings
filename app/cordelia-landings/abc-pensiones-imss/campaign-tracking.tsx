"use client";

import { useEffect, useRef } from "react";
import { initializeMetaPixel, trackMetaEvent } from "@/lib/tracking/meta-pixel";
import { getStoredTraffic } from "@/lib/tracking/utm";
import { landingConfig } from "./config";

export function CampaignTracking() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    initializeMetaPixel(undefined, { trackPageView: false });
    trackMetaEvent("PageView");
    trackMetaEvent("ViewContent", {
      content_name: landingConfig.session.title,
      content_category: "Clase gratuita para asesores de pensiones",
      status: "available",
      value: 0,
      currency: "MXN",
      ...getStoredTraffic(),
    });
  }, []);

  return null;
}
