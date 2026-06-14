'use client';

import React from 'react';
import Image from 'next/image';

export interface ListingData {
  id: number;
  image: string;
  name: string;
  street: string;
  area: string;
  city: string;
  phone_number: string;
  average_rating: number;
  tags: string[];
  services: string[];
  status: string;
}

interface ListingCardProps {
  item: ListingData;
  /** Text shown on the primary CTA button */
  ctaLabel?: string;
  /** Custom icon rendered before the CTA label */
  ctaIcon?: React.ReactNode;
}

/* ── Default CTA icon (bookmark) ── */
const BookmarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M6.66663 2.16669H13.3336C13.8639 2.16677 14.3727 2.37763 14.7477 2.75262C15.1227 3.12768 15.3336 3.63633 15.3336 4.16669V17.5016C15.3339 17.5604 15.318 17.6187 15.2887 17.6696C15.2597 17.72 15.2178 17.7614 15.1676 17.7907C15.1174 17.8187 15.0611 17.8341 15.0035 17.8337H14.9967C14.9385 17.8341 14.8814 17.8183 14.8307 17.7897L10.2506 15.1423L9.99963 14.9977L9.74963 15.1423L5.16663 17.7917C5.11595 17.8209 5.05815 17.8366 4.99963 17.8366C4.94128 17.8366 4.88417 17.8209 4.83362 17.7917C4.78275 17.7623 4.73984 17.7205 4.71057 17.6696C4.68131 17.6187 4.66639 17.5604 4.66663 17.5016V4.16669C4.66663 3.63626 4.87749 3.1277 5.25256 2.75262C5.62763 2.37755 6.1362 2.16669 6.66663 2.16669ZM6.66663 2.83368C6.31301 2.83368 5.97429 2.97426 5.72424 3.2243C5.4742 3.47435 5.33362 3.81307 5.33362 4.16669V16.9245L6.08362 16.4909L9.83362 14.3249C9.88416 14.2957 9.9413 14.28 9.99963 14.28C10.029 14.28 10.0584 14.2841 10.0865 14.2917L10.1666 14.3249L13.9166 16.4909L14.6666 16.9245V4.16669C14.6666 3.81314 14.5259 3.47434 14.276 3.2243C14.026 2.97433 13.6871 2.83376 13.3336 2.83368H6.66663Z"
      stroke="#1D1D1F"
    />
  </svg>
);

/* ── Phone icon for foster-house CTA ── */
export const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M18.3084 15.275C18.3084 15.575 18.2417 15.8834 18.1001 16.1834C17.9584 16.4834 17.7751 16.7667 17.5334 17.0334C17.1251 17.4834 16.6751 17.8084 16.1667 18.0167C15.6667 18.225 15.1251 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.8251 17.725C10.8667 17.3167 9.90839 16.7667 8.95839 16.075C8.00006 15.375 7.09172 14.6 6.22506 13.7417C5.36672 12.875 4.59172 11.9667 3.90006 11.0167C3.21672 10.0667 2.66672 9.11669 2.26672 8.17502C1.86672 7.22502 1.66672 6.31669 1.66672 5.45002C1.66672 4.88336 1.76672 4.34169 1.96672 3.84169C2.16672 3.33336 2.48339 2.86669 2.92506 2.45002C3.45839 1.92502 4.04172 1.66669 4.65839 1.66669C4.89172 1.66669 5.12506 1.71669 5.33339 1.81669C5.55006 1.91669 5.74172 2.06669 5.89172 2.28336L7.82506 5.00836C7.97506 5.21669 8.08339 5.40836 8.15839 5.59169C8.23339 5.76669 8.27506 5.94169 8.27506 6.10002C8.27506 6.30002 8.21672 6.50002 8.10006 6.69169C7.99172 6.88336 7.83339 7.08336 7.63339 7.28336L7.00006 7.94169C6.90839 8.03336 6.86672 8.14169 6.86672 8.27502C6.86672 8.34169 6.87506 8.40002 6.89172 8.46669C6.91672 8.53336 6.94172 8.58336 6.95839 8.63336C7.10839 8.90836 7.36672 9.26669 7.73339 9.70002C8.10839 10.1334 8.50839 10.575 8.94172 11.0167C9.39172 11.4584 9.82506 11.8667 10.2667 12.2417C10.7001 12.6084 11.0584 12.8584 11.3417 13.0084L11.4917 13.075C11.5417 13.0917 11.6001 13.1 11.6667 13.1C11.8084 13.1 11.9167 13.05 12.0084 12.9584L12.6417 12.3334C12.8501 12.125 13.0501 11.9667 13.2417 11.8667C13.4334 11.75 13.6251 11.6917 13.8334 11.6917C13.9917 11.6917 14.1584 11.725 14.3417 11.8C14.5251 11.875 14.7167 11.9834 14.9251 12.125L17.6834 14.0834C17.9001 14.2334 18.0501 14.4084 18.1417 14.6167C18.2251 14.825 18.2751 15.0334 18.2751 15.2667L18.3084 15.275Z"
      stroke="#1D1D1F"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </svg>
);

export default function ListingCard({
  item,
  ctaLabel = 'Book an Appointment',
  ctaIcon,
}: ListingCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] transition-all duration-300 hover:border-[#F7941D]/40 hover:shadow-[0_0_30px_rgba(247,148,29,0.08)]">
      {/* Image Section */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name & Rating */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-[Gabarito] text-[24px] font-medium leading-normal line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 translate-y-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.68323 1.53003C7.71245 1.471 7.75758 1.42132 7.81353 1.38658C7.86949 1.35184 7.93404 1.33344 7.9999 1.33344C8.06576 1.33344 8.13031 1.35184 8.18626 1.38658C8.24222 1.42132 8.28735 1.471 8.31656 1.53003L9.85656 4.64936C9.95802 4.85468 10.1078 5.0323 10.293 5.167C10.4782 5.3017 10.6933 5.38944 10.9199 5.4227L14.3639 5.9267C14.4292 5.93615 14.4905 5.96368 14.5409 6.00616C14.5913 6.04865 14.6288 6.1044 14.6492 6.1671C14.6696 6.22981 14.6721 6.29697 14.6563 6.36099C14.6405 6.42501 14.6071 6.48333 14.5599 6.52936L12.0692 8.9547C11.905 9.11477 11.7821 9.31235 11.7111 9.53045C11.6402 9.74855 11.6233 9.98062 11.6619 10.2067L12.2499 13.6334C12.2614 13.6986 12.2544 13.7657 12.2296 13.8272C12.2048 13.8886 12.1632 13.9418 12.1096 13.9807C12.056 14.0196 11.9925 14.0427 11.9265 14.0473C11.8604 14.0519 11.7944 14.0378 11.7359 14.0067L8.65723 12.388C8.45438 12.2815 8.22868 12.2259 7.99956 12.2259C7.77044 12.2259 7.54475 12.2815 7.3419 12.388L4.2639 14.0067C4.20545 14.0376 4.1395 14.0516 4.07353 14.0469C4.00757 14.0422 3.94424 14.0191 3.89076 13.9802C3.83728 13.9413 3.79579 13.8882 3.771 13.8268C3.74622 13.7655 3.73914 13.6985 3.75056 13.6334L4.3379 10.2074C4.37669 9.98119 4.35989 9.74896 4.28892 9.53073C4.21796 9.31249 4.09497 9.1148 3.93056 8.9547L1.4399 6.53003C1.39229 6.48405 1.35856 6.42563 1.34254 6.36141C1.32652 6.2972 1.32886 6.22978 1.34928 6.16682C1.36971 6.10387 1.40741 6.04793 1.45808 6.00535C1.50876 5.96278 1.57037 5.9353 1.6359 5.92603L5.07923 5.4227C5.30607 5.3897 5.52149 5.30207 5.70695 5.16736C5.89242 5.03264 6.04237 4.85488 6.1439 4.64936L7.68323 1.53003Z"
                fill="#F7941D"
                stroke="#F7941D"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
              {item.average_rating}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="text-[#FFF0DE] font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] bg-[#2a2a2d] rounded-full px-2.5 py-0.5 border border-[#3a3a3d]"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <svg
            className="shrink-0 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M16.6667 8.33335C16.6667 12.4942 12.0509 16.8275 10.5009 18.1659C10.3565 18.2744 10.1807 18.3331 10 18.3331C9.81938 18.3331 9.6436 18.2744 9.49921 18.1659C7.94921 16.8275 3.33337 12.4942 3.33337 8.33335C3.33337 6.56524 4.03575 4.86955 5.286 3.61931C6.53624 2.36907 8.23193 1.66669 10 1.66669C11.7682 1.66669 13.4638 2.36907 14.7141 3.61931C15.9643 4.86955 16.6667 6.56524 16.6667 8.33335Z"
              stroke="#F7941D"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10.8333C11.3807 10.8333 12.5 9.71402 12.5 8.33331C12.5 6.9526 11.3807 5.83331 10 5.83331C8.61929 5.83331 7.5 6.9526 7.5 8.33331C7.5 9.71402 8.61929 10.8333 10 10.8333Z"
              stroke="#F7941D"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="line-clamp-1">
            {item.street}, {item.area}, {item.city}
          </span>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <svg
            className="shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 5V10L13.3333 11.6667"
              stroke="#F7941D"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z"
              stroke="#F7941D"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Open until 6:00 PM</span>
          <span
            className={`px-2 py-0.5 rounded-full font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] ${
              item.status === 'Open'
                ? 'text-[#05DF72] bg-[#05DF72]/10 border border-[#05DF72]/30'
                : 'text-red-400 bg-red-400/10 border border-red-400/30'
            }`}
          >
            {item.status === 'Open' ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* CTA Button */}
        <button
          className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] text-[14px] font-semibold leading-[20px] transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98] cursor-pointer"
          id={`listing-cta-${item.id}`}
        >
          {ctaIcon || <BookmarkIcon />}
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
