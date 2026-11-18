export const TRAFFIC_STORAGE_KEY = "cordelia_traffic";
const trafficKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "campaign_id", "adset_id", "ad_id", "placement"] as const;
export type TrafficKey = (typeof trafficKeys)[number];
export type TrafficData = Partial<Record<TrafficKey, string>>;

export function captureTraffic(search: string): TrafficData {
  const params = new URLSearchParams(search);
  const values = trafficKeys.reduce<TrafficData>((traffic, key) => {
    const value = params.get(key);
    if (value) traffic[key] = value;
    return traffic;
  }, {});
  if (Object.keys(values).length > 0) {
    const serialized = JSON.stringify(values);
    try { sessionStorage.setItem(TRAFFIC_STORAGE_KEY, serialized); } catch { /* Storage no debe bloquear la landing. */ }
  }
  return values;
}

export function getStoredTraffic(): TrafficData {
  if (typeof window === "undefined") return {};
  const current = captureTraffic(window.location.search);
  if (Object.keys(current).length > 0) return current;
  try {
    return JSON.parse(sessionStorage.getItem(TRAFFIC_STORAGE_KEY) ?? "{}") as TrafficData;
  } catch { return {}; }
}
