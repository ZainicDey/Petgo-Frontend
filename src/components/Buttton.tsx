import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  label: string;
  href?: string;
  variant: "gradient" | "solid" | "outline";
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ label, href, variant, className, icon, onClick, type = "button" }: ButtonProps) {
  // Common properties shared by both buttons from your Figma Auto Layout
  const baseStyles =
    "flex items-center justify-center gap-2 px-[24px] py-[14px] rounded-[18px] text-[16px] leading-[20px] text-center transition-transform duration-200 active:scale-95 cursor-pointer";

  const variantStyles = {
    // 1. TAKE OUR SURVEY BUTTON (Frame 6 - Gradient)
    gradient: "h-[48px] btn-gradient text-[16px] font-medium text-white whitespace-nowrap",

    // 2. LOGIN BUTTON (Frame 6 - Solid)
    solid:
      "h-[48px] bg-[#BE1E2D] hover:brightness-110 font-[500] text-white",

    // 3. OUTLINE BUTTON
    outline:
      "bg-transparent border border-[#2a2a2d] hover:border-[#F7941D]/40 text-gray-300 hover:text-white transition-all duration-200",
  };

  const content = (
    <>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variantStyles[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseStyles, variantStyles[variant], className)}>
      {content}
    </button>
  );
}
