import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  href: string;
  variant: "gradient" | "solid";
  className?: string;
}

export default function Button({ label, href, variant, className }: ButtonProps) {
  // Common properties shared by both buttons from your Figma Auto Layout
  const baseStyles =
    "flex items-center justify-center px-[24px] py-[14px] rounded-[18px] text-[16px] leading-[20px] text-center transition-transform duration-200 active:scale-95";

  const variantStyles = {
    // 1. TAKE OUR SURVEY BUTTON (Frame 6 - Gradient)
    gradient: "h-[48px] btn-gradient text-[16px] font-medium text-white whitespace-nowrap",

    // 2. LOGIN BUTTON (Frame 6 - Solid)
    solid:
      "w-[95px] h-[48px] bg-[#BE1E2D] hover:brightness-110 font-[500] text-white",
  };

  return (
    <Link href={href} className={cn(baseStyles, variantStyles[variant], className)}>
      {label}
    </Link>
  );
}
