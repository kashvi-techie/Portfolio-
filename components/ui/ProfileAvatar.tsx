"use client";

import Image from "next/image";
import { useState } from "react";

export function ProfileAvatar({ name, size = 208 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a0a2e] via-[#5b21b6]/40 to-[#0a0612] font-display text-4xl text-gold sm:text-5xl">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src="/hero-profile.png"
      alt={`${name} — profile`}
      width={size}
      height={size}
      className="h-full w-full object-cover"
      priority
      onError={() => setFailed(true)}
    />
  );
}
