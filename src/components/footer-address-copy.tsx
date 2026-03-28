"use client";

import { useState } from "react";

type Props = {
  address: string;
};

export function FooterAddressCopy({ address }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="relative text-left"
      aria-label="주소 복사"
    >
      <span className="underline-offset-4 hover:underline">
        {address}
      </span>
      {copied ? (
        <span className="absolute -top-6 left-0 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium tracking-[0.18em] text-[color:var(--color-rose-pink)] shadow-sm">
          COPIED
        </span>
      ) : null}
    </button>
  );
}

