'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookingModal from '@/components/listing/BookingModal';
import { AdoptionData } from '@/sections/pet-adoption/AdoptionCard';

/* ── SVG Icons ───────────────────────────────────────────────── */

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6668 8.33332C16.6668 12.4942 12.051 16.8275 10.501 18.1658C10.3566 18.2744 10.1808 18.3331 10.0002 18.3331C9.8195 18.3331 9.64373 18.2744 9.49933 18.1658C7.94933 16.8275 3.3335 12.4942 3.3335 8.33332C3.3335 6.56521 4.03588 4.86952 5.28612 3.61928C6.53636 2.36904 8.23205 1.66666 10.0002 1.66666C11.7683 1.66666 13.464 2.36904 14.7142 3.61928C15.9645 4.86952 16.6668 6.56521 16.6668 8.33332Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10.8333C11.3807 10.8333 12.5 9.71406 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71406 8.61929 10.8333 10 10.8333Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15.8337 3.33335H14.167V2.50002C14.167 2.27901 14.0792 2.06704 13.9229 1.91076C13.7666 1.75448 13.5547 1.66669 13.3337 1.66669C13.1126 1.66669 12.9007 1.75448 12.7444 1.91076C12.5881 2.06704 12.5003 2.27901 12.5003 2.50002V3.33335H7.50033V2.50002C7.50033 2.27901 7.41253 2.06704 7.25625 1.91076C7.09997 1.75448 6.88801 1.66669 6.66699 1.66669C6.44598 1.66669 6.23402 1.75448 6.07774 1.91076C5.92146 2.06704 5.83366 2.27901 5.83366 2.50002V3.33335H4.16699C3.50395 3.33335 2.86807 3.59675 2.39923 4.06559C1.93038 4.53443 1.66699 5.17031 1.66699 5.83335V15.8334C1.66699 16.4964 1.93038 17.1323 2.39923 17.6011C2.86807 18.07 3.50395 18.3334 4.16699 18.3334H15.8337C16.4967 18.3334 17.1326 18.07 17.6014 17.6011C18.0703 17.1323 18.3337 16.4964 18.3337 15.8334V5.83335C18.3337 5.17031 18.0703 4.53443 17.6014 4.06559C17.1326 3.59675 16.4967 3.33335 15.8337 3.33335ZM16.667 15.8334C16.667 16.0544 16.5792 16.2663 16.4229 16.4226C16.2666 16.5789 16.0547 16.6667 15.8337 16.6667H4.16699C3.94598 16.6667 3.73402 16.5789 3.57774 16.4226C3.42146 16.2663 3.33366 16.0544 3.33366 15.8334V10H16.667V15.8334ZM16.667 8.33335H3.33366V5.83335C3.33366 5.61234 3.42146 5.40038 3.57774 5.2441C3.73402 5.08782 3.94598 5.00002 4.16699 5.00002H5.83366V5.83335C5.83366 6.05437 5.92146 6.26633 6.07774 6.42261C6.23402 6.57889 6.44598 6.66669 6.66699 6.66669C6.88801 6.66669 7.09997 6.57889 7.25625 6.42261C7.41253 6.26633 7.50033 6.05437 7.50033 5.83335V5.00002H12.5003V5.83335C12.5003 6.05437 12.5881 6.26633 12.7444 6.42261C12.9007 6.57889 13.1126 6.66669 13.3337 6.66669C13.5547 6.66669 13.7666 6.57889 13.9229 6.42261C14.0792 6.26633 14.167 6.05437 14.167 5.83335V5.00002H15.8337C16.0547 5.00002 16.2666 5.08782 16.4229 5.2441C16.5792 5.40038 16.667 5.61234 16.667 5.83335V8.33335Z" fill="#F7941D"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_2042_3902)">
      <path d="M12.5415 4.16665C13.3555 4.32545 14.1035 4.72353 14.6899 5.30993C15.2763 5.89632 15.6744 6.64437 15.8332 7.45831M12.5415 0.833313C14.2326 1.02118 15.8095 1.77846 17.0134 2.98082C18.2173 4.18318 18.9765 5.75915 19.1665 7.44998M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2744C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.2599 16.7477 18.2875 16.5165 18.2666C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53432 2.04007 6.05914 1.76653 3.48331C1.7457 3.25287 1.77309 3.02061 1.84695 2.80133C1.9208 2.58205 2.03951 2.38055 2.1955 2.20966C2.3515 2.03877 2.54137 1.90224 2.75302 1.80875C2.96468 1.71526 3.19348 1.66686 3.42486 1.66665H5.92486C6.32928 1.66267 6.72136 1.80588 7.028 2.06959C7.33464 2.3333 7.53493 2.69952 7.59153 3.09998C7.69705 3.90003 7.89274 4.68559 8.17486 5.44165C8.28698 5.73992 8.31125 6.06408 8.24478 6.37571C8.17832 6.68735 8.02392 6.97341 7.79986 7.19998L6.74153 8.25831C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.9759 13.3125 11.8215 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4654 17.6744 12.6693 17.9386 12.9812C18.2029 13.2931 18.3433 13.6913 18.3332 14.1Z" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2042_3902">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F7941D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Main Component ──────────────────────────────────────────── */

export default function AdoptionDetailPage({ data }: { data: AdoptionData }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const tags = [data.breed, data.age, data.gender];

  return (
    <section className="relative min-h-screen overflow-hidden font-[family-name:var(--font-opensans)]">
      {/* ── Background Rectangle ── */}
      <div className="absolute -top-15 inset-x-0 z-0 flex justify-center pointer-events-none mt-9 opacity-95">
        <div
          className="w-full h-[700px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(136, 136, 136, 0.00) 0%, rgba(104, 104, 104, 0.25) 50%, rgba(136, 136, 136, 0.00) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-20">
        {/* ── Back Link ── */}
        <Link
          href="/pet-adoption"
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#F7941D] transition-colors duration-200 text-[14px] mb-6 group"
        >
          <BackIcon />
          <span className="group-hover:underline">Back to Pet Adoption</span>
        </Link>

        {/* ── Two-column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 w-full max-w-[860px] flex flex-col gap-6">
            {/* Hero Image */}
            <div className="relative w-full h-[300px] md:h-[430px] rounded-2xl overflow-hidden bg-[#1A1A1D] border border-[#2a2a2d]">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>

            {/* About */}
            <div
              style={{
                borderRadius: '18px',
                border: '1px solid rgba(255, 240, 222, 0.075)',
                background: 'rgba(255, 240, 222, 0.075)',
              }}
              className="p-6"
            >
              <h2 className="text-white font-[Gabarito] text-[20px] font-semibold mb-3">
                About {data.name}
              </h2>
              <p className="text-white/70 text-[15px] leading-[1.7] whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Sticky Info Panel ── */}
          <div className="w-full lg:w-[340px] xl:w-[440px] shrink-0">
            <div
              style={{
                borderRadius: '18px',
                border: '1px solid rgba(255, 240, 222, 0.1)',
                background: 'rgba(255, 240, 222, 0.05)',
              }}
              className="lg:sticky lg:top-24 overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-5 my-3">
                {/* Name & Tags */}
                <div className="flex flex-col gap-3 min-w-0">
                  <h2
                    style={{
                      color: '#FFF',
                      fontFamily: 'Gabarito',
                      fontSize: '32px',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                    className="break-words"
                  >
                    {data.name}
                  </h2>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            color: '#FFF0DE',
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '13px',
                            fontWeight: 300,
                            lineHeight: '17px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 240, 222, 0.10)',
                            background: 'rgba(255, 240, 222, 0.05)',
                            padding: '4px 12px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#FFF0DE]/5" />

                {/* Pet Details Section */}
                <div className="flex flex-col gap-3">
                  {/* Location */}
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">
                      <LocationIcon />
                    </span>
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        lineHeight: '22px',
                      }}
                    >
                      {data.location}
                    </span>
                  </div>

                  {/* Date Posted */}
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">
                      <CalendarIcon />
                    </span>
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        lineHeight: '22px',
                      }}
                    >
                      {data.postedDate}
                    </span>
                  </div>
                  
                  {/* Health */}
                  <p 
                    className="mt-1"
                    style={{
                      color: 'rgba(255, 255, 255, 0.60)',
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '22px'
                    }}
                  >
                    Health: {data.health}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#FFF0DE]/5" />

                {/* Owner Info & Contact Button */}
                <div>
                  <p
                    style={{
                      color: '#FFF',
                      fontFamily: 'Gabarito',
                      fontSize: '18px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      marginBottom: '16px',
                    }}
                  >
                    Owner Details
                  </p>
                  
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2a2a2d] flex items-center justify-center shrink-0">
                        <UserIcon />
                      </div>
                      <span className="text-white text-[16px] font-['Open_Sans'] font-medium">
                        The {data.name} Family Home
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F7941D] text-[#1D1D1F] transition-all duration-300 hover:bg-[#d87c12] active:scale-[0.98] cursor-pointer"
                    style={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '20px'
                    }}
                  >
                    <PhoneIcon />
                    Contact Donor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        item={{
          name: `The ${data.name} Family Home`,
          area: data.location,
          phone_number: '+8801966-440001',
        }}
        hideCard={true}
        variant="pet-adoption"
      />
    </section>
  );
}
