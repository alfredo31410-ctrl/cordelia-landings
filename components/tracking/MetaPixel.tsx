"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CORDELIA_META_PIXEL_ID } from "@/lib/tracking/config";
import { trackMetaStandardEvent } from "@/lib/tracking/meta-pixel";

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPageKey = useRef<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady || !pathname) return;
    const pageKey = `${pathname}?${searchParams.toString()}`;
    if (lastPageKey.current === pageKey) return;
    lastPageKey.current = pageKey;
    trackMetaStandardEvent("PageView");
  }, [isReady, pathname, searchParams]);

  return <Script id="meta-pixel" strategy="afterInteractive" onReady={() => setIsReady(true)} dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${CORDELIA_META_PIXEL_ID}');` }} />;
}
