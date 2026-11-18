"use client";

import { useEffect } from "react";
import { captureTraffic } from "@/lib/tracking/utm";

export function UTMTracking() {
  useEffect(() => { captureTraffic(window.location.search); }, []);
  return null;
}
