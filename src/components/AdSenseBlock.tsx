"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// 타입 선언
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSenseBlock() {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 광고가 아직 로드되지 않은 경우만 push
    if (
      adRef.current &&
      !adRef.current
        .querySelector("ins")
        ?.getAttribute("data-adsbygoogle-status")
    ) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7622300846359900"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7622300846359900"
          data-ad-slot="4894887386"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
