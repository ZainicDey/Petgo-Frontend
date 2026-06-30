"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/Logo_PetGo.png";
import Button from "@/components/Buttton";
import { useCart } from "@/lib/cartContext";
import CartModal from "@/components/ecommerce/CartModal";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/#about-us" },
  // { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <nav className="relative z-50 w-full">
        <div className="container mx-auto flex w-full items-center justify-between px-5 py-7">
          {/* ── Logo ── */}
          <a href="/" className="shrink-0">
            <Image
              src={Logo}
              alt="PetGo Care"
              width={200}
              height={80}
              priority
              className="h-[50px] w-auto object-contain"
            />
          </a>

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

          {/* ── Right Side: Cart Icon + Login (Desktop) ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon – only visible when cart has items */}
            {totalItems > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={`Open cart – ${totalItems} item${totalItems > 1 ? "s" : ""}`}
                id="navbar-cart-btn"
              >
                {/* Cart SVG (white) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#navbar-cart-clip)">
                    <path
                      d="M16.6668 18.3334C17.1271 18.3334 17.5002 17.9603 17.5002 17.5C17.5002 17.0398 17.1271 16.6667 16.6668 16.6667C16.2066 16.6667 15.8335 17.0398 15.8335 17.5C15.8335 17.9603 16.2066 18.3334 16.6668 18.3334Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.49984 18.3334C7.96007 18.3334 8.33317 17.9603 8.33317 17.5C8.33317 17.0398 7.96007 16.6667 7.49984 16.6667C7.0396 16.6667 6.6665 17.0398 6.6665 17.5C6.6665 17.9603 7.0396 18.3334 7.49984 18.3334Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.833496 0.833313H4.16683L6.40016 11.9916C6.47637 12.3753 6.68509 12.7199 6.98978 12.9652C7.29448 13.2105 7.67574 13.3408 8.06683 13.3333H16.1668C16.5579 13.3408 16.9392 13.2105 17.2439 12.9652C17.5486 12.7199 17.7573 12.3753 17.8335 11.9916L19.1668 4.99998H5.00016"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="navbar-cart-clip">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Red notification badge */}
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#BE1E2D] text-white text-[10px] font-bold leading-none select-none shadow-md"
                  aria-hidden="true"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              </button>
            )}

            <Button label="LOGIN" href="/login" variant="solid" />
          </div>

          {/* ── Mobile: Cart + Hamburger ── */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile cart icon */}
            {totalItems > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center justify-center w-9 h-9 cursor-pointer"
                aria-label="Open cart"
                id="navbar-cart-btn-mobile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#navbar-cart-clip-mobile)">
                    <path
                      d="M16.6668 18.3334C17.1271 18.3334 17.5002 17.9603 17.5002 17.5C17.5002 17.0398 17.1271 16.6667 16.6668 16.6667C16.2066 16.6667 15.8335 17.0398 15.8335 17.5C15.8335 17.9603 16.2066 18.3334 16.6668 18.3334Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.49984 18.3334C7.96007 18.3334 8.33317 17.9603 8.33317 17.5C8.33317 17.0398 7.96007 16.6667 7.49984 16.6667C7.0396 16.6667 6.6665 17.0398 6.6665 17.5C6.6665 17.9603 7.0396 18.3334 7.49984 18.3334Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.833496 0.833313H4.16683L6.40016 11.9916C6.47637 12.3753 6.68509 12.7199 6.98978 12.9652C7.29448 13.2105 7.67574 13.3408 8.06683 13.3333H16.1668C16.5579 13.3408 16.9392 13.2105 17.2439 12.9652C17.5486 12.7199 17.7573 12.3753 17.8335 11.9916L19.1668 4.99998H5.00016"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="navbar-cart-clip-mobile">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#BE1E2D] text-white text-[9px] font-bold leading-none select-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              </button>
            )}

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              className="flex flex-col items-center justify-center gap-[5px] p-2"
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

      {/* ── Cart Modal ── */}
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}
    </>
  );
}
