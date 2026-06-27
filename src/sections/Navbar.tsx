"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/Logo_PetGo.png";
import Button from "@/components/Buttton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/#about-us" },
  // { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full">
      <div className="container mx-auto flex w-full items-center justify-between px-5 py-7">
        {/* ── Logo ── */}
        <Link href="/" className="shrink-0">
          <Image
            src={Logo}
            alt="PetGo Care"
            width={200}
            height={80}
            priority
            className="h-[50px] w-auto object-contain"
          />
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-[17px] font-normal leading-5 text-[#fdfdfde5] transition-colors duration-200 hover:text-[#ffe1bd] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#F7941D] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Login Button (Desktop) ── */}
        <div className="hidden md:block">
          <Button label="LOGIN" href="/login" variant="solid" />
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="flex md:hidden flex-col items-center justify-center gap-[5px] p-2"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className={`block h-[2px] w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 rounded bg-white transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Menu Panel ── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-semibold text-gray-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Button label="LOGIN" href="/login" variant="solid" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
