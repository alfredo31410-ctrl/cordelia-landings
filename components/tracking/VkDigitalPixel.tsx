"use client";

import Script from "next/script";
import { CORDELIA_VK_PIXEL_ID } from "@/lib/tracking/config";

const vkDigitalLeadsScript = `
(function(w, d, s, u) {
  w.vkPixel = w.vkPixel || { _q: [] };
  w.vkPixel._q.push(['init', '${CORDELIA_VK_PIXEL_ID}']);
  var js = d.createElement(s);
  js.src = u;
  js.async = true;
  d.head.appendChild(js);
})(window, document, 'script', 'https://cf.vkdigital.com.br/pixel.js?v=55');
`;

export function VkDigitalPixel() {
  return (
    <Script
      id="vk-digital-leads-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: vkDigitalLeadsScript }}
    />
  );
}
