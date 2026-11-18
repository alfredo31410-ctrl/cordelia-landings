"use client";

import Script from "next/script";

const pixelId = process.env.NEXT_PUBLIC_VK_PIXEL_ID;

export function VkDigitalPixel() {
  if (!pixelId) return null;
  return <>
    <Script id="vk-digital-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window._tmr=window._tmr||[];window._tmr.push({type:'pageView',id:'${pixelId}',start:Date.now()});` }} />
    <Script id="vk-digital-pixel" strategy="afterInteractive" src="https://top-fwz1.mail.ru/js/code.js" />
  </>;
}
