'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';

/* ── Step Progress Bar ─────────────────────────────────────── */

function StepBar({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  const steps = [
    { label: 'Shopping Bag', sub: 'View your items', icon: 'check' },
    { label: 'Shipping & Checkout', sub: 'Enter your details', icon: 'check' },
    { label: 'Confirmation', sub: 'Review your order!', icon: '3' },
  ];

  return (
    <div className="w-full mb-10">
      <div className="flex items-start gap-0">
        {steps.map((step, i) => {
          const idx = i + 1;
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-start gap-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {/* Circle */}
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#F7941D] border-[#F7941D]'
                        : isActive
                          ? 'bg-[#F7941D] border-[#F7941D]'
                          : 'bg-transparent border-white/20 text-white/30'
                    }`}
                  >
                    {isCompleted || isActive ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="text-xs font-bold">{idx}</span>
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold leading-tight font-[Gabarito] ${
                        isActive || isCompleted ? 'text-white' : 'text-white/30'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs ${
                        isActive
                          ? 'text-[#F7941D]'
                          : isCompleted
                            ? 'text-white/50'
                            : 'text-white/20'
                      }`}
                    >
                      {step.sub}
                    </p>
                  </div>
                </div>
                {/* Progress track */}
                {i < steps.length - 1 && (
                  <div className="w-full h-[3px] rounded-full bg-white/10 mt-1 ml-0">
                    <div
                      className="h-full rounded-full bg-[#F7941D] transition-all duration-500"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ── Checkout Page ─────────────────────────────────────────── */

type PaymentMethod = 'bkash' | 'cod' | 'online';
type ShippingMethod = 'free' | 'flat' | 'sameday';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    district: 'Dhaka',
    phone: '',
    email: '',
    notes: '',
    createAccount: false,
    shipDifferent: false,
  });

  const [shipping, setShipping] = useState<ShippingMethod>('free');
  const [payment, setPayment] = useState<PaymentMethod>('bkash');
  const [agreed, setAgreed] = useState(false);
  const [placed, setPlaced] = useState(false);

  const DISTRICTS = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal',
    'Sylhet', 'Rangpur', 'Mymensingh',
  ];

  const shippingCost =
    shipping === 'flat' ? 80 : shipping === 'sameday' ? 240 : 0;
  const bkashCharge = payment === 'bkash' ? Math.round(subtotal * 0.015) : 0;
  const total = subtotal + shippingCost + bkashCharge;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#F7941D]/20 border-2 border-[#F7941D] mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F7941D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[#F7941D] font-[Gabarito] text-4xl font-bold mb-3">
            Order Placed!
          </h1>
          <p className="text-white/60 text-base mb-8 font-[family-name:var(--font-opensans)]">
            Thank you for your order. We&apos;ll send you a confirmation soon.
          </p>
          <Link
            href="/pet-shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[14px] bg-[#F7941D] text-[#1D1D1F] font-bold font-[family-name:var(--font-opensans)] hover:bg-[#e07c0a] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
      {/* ── Step Progress ── */}
      <StepBar currentStep={2} />

      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Column: Billing Details ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Returning / Coupon banners */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1A1A1D] border border-[#2a2a2d] text-sm text-white/50 font-[family-name:var(--font-opensans)]">
                Returning customer?{' '}
                <Link href="/login" className="text-[#F7941D] hover:underline ml-1">
                  Click here to login
                </Link>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1A1A1D] border border-[#2a2a2d] text-sm text-white/50 font-[family-name:var(--font-opensans)]">
                Have a coupon?{' '}
                <button type="button" className="text-[#F7941D] hover:underline ml-1 cursor-pointer">
                  Click here to enter your code
                </button>
              </div>
            </div>

            {/* Billing form */}
            <div className="bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl p-6 space-y-5">
              <h2 className="text-white font-[Gabarito] text-2xl font-bold mb-2">
                BILLING DETAILS
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Full Name <span className="text-[#BE1E2D]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors font-[family-name:var(--font-opensans)]"
                  id="checkout-fullname"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Street address <span className="text-[#BE1E2D]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="House number and street name"
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors font-[family-name:var(--font-opensans)]"
                  id="checkout-street"
                />
              </div>

              {/* Town / City */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Town / City <span className="text-[#BE1E2D]">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors font-[family-name:var(--font-opensans)]"
                  id="checkout-city"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  District <span className="text-[#BE1E2D]">*</span>
                </label>
                <select
                  required
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors cursor-pointer font-[family-name:var(--font-opensans)]"
                  id="checkout-district"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d} className="bg-[#1A1A1D]">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Country / Region <span className="text-[#BE1E2D]">*</span>
                </label>
                <div className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white/50 text-sm flex items-center font-[family-name:var(--font-opensans)]">
                  Bangladesh
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Phone <span className="text-[#BE1E2D]">*</span>
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors font-[family-name:var(--font-opensans)]"
                  id="checkout-phone"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Email address <span className="text-[#BE1E2D]">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-[46px] px-4 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors font-[family-name:var(--font-opensans)]"
                  id="checkout-email"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="createAccount"
                    checked={form.createAccount}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-[#F7941D] cursor-pointer"
                    id="checkout-create-account"
                  />
                  <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors font-[family-name:var(--font-opensans)]">
                    Create an account?
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="shipDifferent"
                    checked={form.shipDifferent}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-[#F7941D] cursor-pointer"
                    id="checkout-ship-different"
                  />
                  <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors font-[family-name:var(--font-opensans)]">
                    Ship to a different address?
                  </span>
                </label>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5 font-[family-name:var(--font-opensans)]">
                  Order notes{' '}
                  <span className="text-white/30">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Notes about your order, e.g., special notes for delivery."
                  className="w-full px-4 py-3 rounded-xl bg-[#111113] border border-[#2a2a2d] text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#F7941D]/50 transition-colors resize-none font-[family-name:var(--font-opensans)]"
                  id="checkout-notes"
                />
              </div>
            </div>
          </div>

          {/* ── Right Column: Order Summary ── */}
          <div className="w-full lg:w-[380px] shrink-0 space-y-4">
            {/* Your Order */}
            <div className="bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl p-6">
              <h2 className="text-white font-[Gabarito] text-xl font-bold mb-5 pb-3 border-b border-[#2a2a2d]">
                YOUR ORDER
              </h2>

              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-xs uppercase tracking-widest font-[family-name:var(--font-opensans)]">
                  Product
                </span>
                <span className="text-white/40 text-xs uppercase tracking-widest font-[family-name:var(--font-opensans)]">
                  Subtotal
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {items.length === 0 ? (
                  <p className="text-white/30 text-sm text-center py-4 font-[family-name:var(--font-opensans)]">
                    No items in cart
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 py-2 border-b border-[#2a2a2d] last:border-0"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#111]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#FFF0DE] text-sm font-medium line-clamp-2 leading-snug font-[Gabarito]">
                          {item.name}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5 font-[family-name:var(--font-opensans)]">
                          × {item.quantity}
                        </p>
                      </div>
                      <span className="text-[#F7941D] text-sm font-semibold font-[Gabarito] shrink-0">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between py-3 border-t border-[#2a2a2d]">
                <span className="text-white/50 text-sm font-[family-name:var(--font-opensans)]">
                  Subtotal
                </span>
                <span className="text-[#FFF0DE] font-[Gabarito] font-semibold">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              {/* Shipping */}
              <div className="py-3 border-t border-[#2a2a2d]">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-white/50 text-sm font-[family-name:var(--font-opensans)]">
                    Shipment
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { key: 'free', label: 'Free Shipping', price: 0 },
                    { key: 'flat', label: 'Flat rate – under BDT 2500', price: 80 },
                    { key: 'sameday', label: 'Same Day Delivery', price: 240 },
                  ].map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.key}
                        checked={shipping === opt.key}
                        onChange={() => setShipping(opt.key as ShippingMethod)}
                        className="accent-[#F7941D] cursor-pointer"
                        id={`shipping-${opt.key}`}
                      />
                      <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors font-[family-name:var(--font-opensans)]">
                        {opt.label}
                        {opt.price > 0 && (
                          <span className="text-white/40 ml-1">
                            ৳{opt.price}
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* bKash charge */}
              {payment === 'bkash' && bkashCharge > 0 && (
                <div className="flex items-center justify-between py-3 border-t border-[#2a2a2d]">
                  <span className="text-white/50 text-sm font-[family-name:var(--font-opensans)]">
                    bKash Charge (1.5%)
                  </span>
                  <span className="text-white/70 font-[Gabarito] font-semibold text-sm">
                    ৳{bkashCharge.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Total */}
              <div className="flex items-center justify-between py-4 border-t-2 border-dashed border-[#F7941D]/30 mt-1">
                <span className="text-white font-bold font-[Gabarito] text-lg">
                  Total
                </span>
                <span className="text-[#F7941D] font-[Gabarito] font-bold text-xl">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl p-6 space-y-4">
              {/* bKash option */}
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#2a2a2d] transition-colors group">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={payment === 'bkash'}
                  onChange={() => setPayment('bkash')}
                  className="accent-[#F7941D] cursor-pointer"
                  id="payment-bkash"
                />
                <span className="text-white/70 text-sm font-[family-name:var(--font-opensans)] flex-1">
                  bKash Payment Gateway
                </span>
                {/* bKash logo text */}
                <span
                  className="font-bold text-lg"
                  style={{ color: '#E2136E', fontFamily: 'Georgia, serif' }}
                >
                  bKash
                </span>
              </label>

              {payment === 'bkash' && (
                <div className="ml-7 p-3 rounded-xl bg-[#111113] border border-[#2a2a2d] text-sm text-white/50 font-[family-name:var(--font-opensans)]">
                  Pay securely via bKash mobile banking. A 1.5% processing fee
                  applies.
                </div>
              )}

              {/* COD */}
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#2a2a2d] transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === 'cod'}
                  onChange={() => setPayment('cod')}
                  className="accent-[#F7941D] cursor-pointer"
                  id="payment-cod"
                />
                <span className="text-white/70 text-sm font-[family-name:var(--font-opensans)]">
                  Cash on Delivery (COD)
                </span>
              </label>

              {/* Online */}
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#2a2a2d] transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={payment === 'online'}
                  onChange={() => setPayment('online')}
                  className="accent-[#F7941D] cursor-pointer"
                  id="payment-online"
                />
                <span className="text-white/70 text-sm font-[family-name:var(--font-opensans)]">
                  Pay Online (Credit/Debit Card / Mobile Banking / NetBanking)
                </span>
              </label>

              {/* Privacy note */}
              <p className="text-white/30 text-xs font-[family-name:var(--font-opensans)] pt-1">
                Your personal data will be used to process your order and
                support your experience. See our{' '}
                <Link href="#" className="text-[#F7941D] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 accent-[#F7941D] cursor-pointer shrink-0"
                  id="checkout-terms"
                />
                <span className="text-white/50 text-xs group-hover:text-white/70 transition-colors font-[family-name:var(--font-opensans)]">
                  I have read and agree to the website{' '}
                  <Link href="#" className="text-[#F7941D] hover:underline">
                    terms and conditions
                  </Link>
                  ,{' '}
                  <Link href="#" className="text-[#F7941D] hover:underline">
                    Privacy Policy
                  </Link>
                  , &amp;{' '}
                  <Link href="#" className="text-[#F7941D] hover:underline">
                    Return Policy
                  </Link>{' '}
                  *
                </span>
              </label>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={items.length === 0 || !agreed}
                id="checkout-place-order-btn"
                className="w-full h-[52px] rounded-[14px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] font-bold text-base transition-all duration-200 hover:bg-[#e07c0a] active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {payment === 'bkash'
                  ? 'PAY WITH BKASH'
                  : payment === 'cod'
                    ? 'PLACE ORDER'
                    : 'PAY ONLINE'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
