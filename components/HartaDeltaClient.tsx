"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type HartaDelta from "./HartaDelta";

const HartaInner = dynamic(() => import("./HartaDelta"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-water-2/30 rounded-xl flex items-center justify-center text-fog/50">
      Se încarcă harta...
    </div>
  ),
});

export default function HartaDeltaClient(props: ComponentProps<typeof HartaDelta>) {
  return <HartaInner {...props} />;
}
