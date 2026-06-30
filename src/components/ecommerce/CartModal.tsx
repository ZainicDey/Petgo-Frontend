'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { items, subtotal, removeItem, increaseQty, decreaseQty, totalItems } =
    useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-start justify-end"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
    >
      {/* Drawer */}
      <div
        className="relative flex flex-col h-full w-full max-w-[420px] bg-[#111113] border-l border-[#2a2a2d] shadow-2xl animate-slide-in-right"
        style={{ animation: 'slideInRight 0.28s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2d]">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#cart-modal-clip)">
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
                <clipPath id="cart-modal-clip">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-white font-[Gabarito] text-xl font-semibold">
              Your Cart
            </span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#BE1E2D] text-white text-xs font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close cart"
            id="cart-modal-close-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 20 20"
                fill="none"
                className="mb-4 opacity-20"
              >
                <g clipPath="url(#cart-empty-clip)">
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
                  <clipPath id="cart-empty-clip">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-white/40 text-base">Your cart is empty</p>
              <p className="text-white/25 text-sm mt-1">
                Add some products to get started
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-xl bg-[#1A1A1D] border border-[#2a2a2d] transition-all duration-200 hover:border-[#3a3a3d]"
              >
                {/* Image */}
                <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0 bg-[#111]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 min-w-0 gap-1">
                  <p className="text-[#FFF0DE] text-sm font-medium leading-[1.3] line-clamp-2 font-[Gabarito]">
                    {item.name}
                  </p>
                  <p className="text-white/40 text-xs">{item.category}</p>
                  <p className="text-[#F7941D] text-sm font-semibold font-[Gabarito]">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Qty Controls + Remove */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-white/30 hover:text-[#BE1E2D] transition-colors cursor-pointer"
                    aria-label={`Remove ${item.name}`}
                    id={`cart-remove-${item.id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>

                  {/* Qty row */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="flex items-center justify-center w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 text-white text-base transition-colors cursor-pointer select-none"
                      aria-label="Decrease quantity"
                      id={`cart-decrease-${item.id}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-white text-sm font-semibold select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="flex items-center justify-center w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 text-white text-base transition-colors cursor-pointer select-none"
                      aria-label="Increase quantity"
                      id={`cart-increase-${item.id}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#2a2a2d] space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm font-[family-name:var(--font-opensans)]">
                Subtotal
              </span>
              <span className="text-[#FFF0DE] text-lg font-semibold font-[Gabarito]">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-white/30 text-xs font-[family-name:var(--font-opensans)]">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              id="cart-checkout-btn"
              className="flex items-center justify-center gap-2 w-full h-[50px] rounded-[14px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] text-[16px] font-bold transition-colors duration-200 hover:bg-[#e07c0a] active:scale-[0.98]"
            >
              Proceed to Checkout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              id="cart-continue-shopping-btn"
              className="w-full text-center text-white/40 hover:text-white text-sm transition-colors cursor-pointer font-[family-name:var(--font-opensans)]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
