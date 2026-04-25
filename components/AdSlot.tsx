"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  /** Your AdSense slot ID (the `data-ad-slot` value) */
  slot?: string;
  /** Your publisher ID (ca-pub-XXXX). If unset, renders a placeholder. */
  client?: string;
  /** Layout: 'horizontal' for banners, 'square' for in-content, 'vertical' for sidebars */
  layout?: "horizontal" | "square" | "vertical";
  /** Show a styled placeholder instead of leaving empty space when ads aren't configured */
  showPlaceholder?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

export default function AdSlot({
  slot,
  client,
  layout = "horizontal",
  showPlaceholder = true,
  className = "",
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!slot || !client) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* no-op */
    }
  }, [slot, client]);

  const sizes = {
    horizontal: "min-h-[90px] md:min-h-[120px]",
    square: "min-h-[280px] aspect-square max-w-sm",
    vertical: "min-h-[600px] max-w-[300px]",
  };

  // If publisher details are wired, render real AdSense
  if (slot && client) {
    return (
      <div className={`w-full ${sizes[layout]} ${className}`}>
        <ins
          ref={ref}
          className="adsbygoogle block w-full h-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Tasteful placeholder — keeps the visual rhythm of the page
  if (!showPlaceholder) return null;
  return (
    <div
      className={`glass rounded-2xl flex items-center justify-center ${sizes[layout]} ${className}`}
    >
      <div className="text-center px-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-bone-dimmer mb-1.5">
          Sponsored
        </div>
        <div className="text-bone-dim text-sm font-mono">ad slot · {layout}</div>
      </div>
    </div>
  );
}
