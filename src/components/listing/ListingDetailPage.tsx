'use client';

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookingModal from '@/components/listing/BookingModal';
import { BookmarkIcon } from '@/components/listing';

/* ── Types ────────────────────────────────────────────────────── */

export interface DayHours {
  open: string;
  close: string;
}

export interface OpeningHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface TeamMember {
  id: number;
  image: string | null;
  name: string;
  specialization: string;
  experience: number;
  order: number;
}

/** @deprecated Use TeamMember instead */
export type Veterinarian = TeamMember;

export interface ListingDetailData {
  id: number;
  image: string | null;
  /** Optional array of image URLs for the gallery slideshow */
  images?: string[];
  name: string;
  about: string;
  street: string;
  area: string;
  city: string;
  website: string;
  opening_hours: OpeningHours;
  phone_number: string;
  whatsapp_number: string;
  average_rating: number;
  tag_names: string[];
  service_names: string[];
  veterinarians: TeamMember[];
  created_at: string;
  updated_at: string;
}

/** @deprecated Use ListingDetailData instead */
export type VetDetailData = ListingDetailData;

export interface ListingDetailPageProps {
  data: ListingDetailData;
  /** Label for the CTA button. Defaults to "Book an Appointment" */
  ctaLabel?: string;
  /** Back link href — defaults to "/vet-finder" */
  backHref?: string;
  /** Back link label */
  backLabel?: string;
  /** Heading for the About section. Defaults to "About Us" */
  aboutHeading?: string;
  /** Heading for the Team section. Defaults to "Our Team" */
  teamHeading?: string;
}

/* ── Helpers ─────────────────────────────────────────────────── */

const DAYS_ORDER: Array<keyof OpeningHours> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTodayKey(): keyof OpeningHours {
  return DAYS_ORDER[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
}

function getOpenStatus(hours: OpeningHours): { open: boolean; label: string } {
  const todayKey = getTodayKey();
  const todayHours = hours[todayKey];
  if (!todayHours) return { open: false, label: 'Closed today' };

  const now = new Date();
  const [oh, om] = todayHours.open.split(':').map(Number);
  const [ch, cm] = todayHours.close.split(':').map(Number);
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (nowMin >= openMin && nowMin < closeMin) {
    return { open: true, label: `Open until ${formatTime(todayHours.close)}` };
  }
  return { open: false, label: `Opens at ${formatTime(todayHours.open)}` };
}

/* ── SVG Icons ───────────────────────────────────────────────── */

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.68323 1.53002C7.71245 1.47099 7.75758 1.4213 7.81353 1.38657C7.86949 1.35183 7.93404 1.33342 7.9999 1.33342C8.06576 1.33342 8.13031 1.35183 8.18626 1.38657C8.24222 1.4213 8.28735 1.47099 8.31656 1.53002L9.85656 4.64935C9.95802 4.85466 10.1078 5.03229 10.293 5.16698C10.4782 5.30168 10.6933 5.38942 10.9199 5.42268L14.3639 5.92668C14.4292 5.93614 14.4905 5.96366 14.5409 6.00615C14.5913 6.04863 14.6288 6.10438 14.6492 6.16709C14.6696 6.22979 14.6721 6.29695 14.6563 6.36097C14.6405 6.42499 14.6071 6.48332 14.5599 6.52935L12.0692 8.95468C11.905 9.11475 11.7821 9.31234 11.7111 9.53044C11.6402 9.74853 11.6233 9.98061 11.6619 10.2067L12.2499 13.6333C12.2614 13.6986 12.2544 13.7657 12.2296 13.8271C12.2048 13.8886 12.1632 13.9418 12.1096 13.9807C12.056 14.0196 11.9925 14.0427 11.9265 14.0473C11.8604 14.0519 11.7944 14.0378 11.7359 14.0067L8.65723 12.388C8.45438 12.2815 8.22868 12.2258 7.99956 12.2258C7.77044 12.2258 7.54475 12.2815 7.3419 12.388L4.2639 14.0067C4.20545 14.0376 4.1395 14.0515 4.07353 14.0469C4.00757 14.0422 3.94424 14.0191 3.89076 13.9802C3.83728 13.9413 3.79579 13.8881 3.771 13.8268C3.74622 13.7655 3.73914 13.6985 3.75056 13.6333L4.3379 10.2073C4.37669 9.98117 4.35989 9.74895 4.28892 9.53071C4.21796 9.31248 4.09497 9.11479 3.93056 8.95468L1.4399 6.53002C1.39229 6.48404 1.35856 6.42561 1.34254 6.3614C1.32652 6.29718 1.32886 6.22976 1.34928 6.16681C1.36971 6.10386 1.40741 6.04791 1.45808 6.00534C1.50876 5.96277 1.57037 5.93528 1.6359 5.92602L5.07923 5.42268C5.30607 5.38968 5.52149 5.30205 5.70695 5.16734C5.89242 5.03263 6.04237 4.85486 6.1439 4.64935L7.68323 1.53002Z"
      fill="#F7941D"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const ClockIcon = () => (
  <svg
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
      d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 9.99999C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 9.99999C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
      stroke="#F7941D"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_globe)">
      <path
        d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 9.99999C18.3332 5.39762 14.6022 1.66666 9.99984 1.66666C5.39746 1.66666 1.6665 5.39762 1.6665 9.99999C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
        stroke="#F7941D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99984 1.66666C7.86003 3.91345 6.6665 6.89727 6.6665 9.99999C6.6665 13.1027 7.86003 16.0865 9.99984 18.3333C12.1396 16.0865 13.3332 13.1027 13.3332 9.99999C13.3332 6.89727 12.1396 3.91345 9.99984 1.66666Z"
        stroke="#F7941D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.6665 10H18.3332"
        stroke="#F7941D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_globe">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M18.3084 15.275C18.3084 15.575 18.2417 15.8834 18.1001 16.1834C17.9584 16.4834 17.7751 16.7667 17.5334 17.0334C17.1251 17.4834 16.6751 17.8084 16.1667 18.0167C15.6667 18.225 15.1251 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.8251 17.725C10.8667 17.3167 9.90839 16.7667 8.95839 16.075C8.00006 15.375 7.09172 14.6 6.22506 13.7417C5.36672 12.875 4.59172 11.9667 3.90006 11.0167C3.21672 10.0667 2.66672 9.11669 2.26672 8.17502C1.86672 7.22502 1.66672 6.31669 1.66672 5.45002C1.66672 4.88336 1.76672 4.34169 1.96672 3.84169C2.16672 3.33336 2.48339 2.86669 2.92506 2.45002C3.45839 1.92502 4.04172 1.66669 4.65839 1.66669C4.89172 1.66669 5.12506 1.71669 5.33339 1.81669C5.55006 1.91669 5.74172 2.06669 5.89172 2.28336L7.82506 5.00836C7.97506 5.21669 8.08339 5.40836 8.15839 5.59169C8.23339 5.76669 8.27506 5.94169 8.27506 6.10002C8.27506 6.30002 8.21672 6.50002 8.10006 6.69169C7.99172 6.88336 7.83339 7.08336 7.63339 7.28336L7.00006 7.94169C6.90839 8.03336 6.86672 8.14169 6.86672 8.27502C6.86672 8.34169 6.87506 8.40002 6.89172 8.46669C6.91672 8.53336 6.94172 8.58336 6.95839 8.63336C7.10839 8.90836 7.36672 9.26669 7.73339 9.70002C8.10839 10.1334 8.50839 10.575 8.94172 11.0167C9.39172 11.4584 9.82506 11.8667 10.2667 12.2417C10.7001 12.6084 11.0584 12.8584 11.3417 13.0084L11.4917 13.075C11.5417 13.0917 11.6001 13.1 11.6667 13.1C11.8084 13.1 11.9167 13.05 12.0084 12.9584L12.6417 12.3334C12.8501 12.125 13.0501 11.9667 13.2417 11.8667C13.4334 11.75 13.6251 11.6917 13.8334 11.6917C13.9917 11.6917 14.1584 11.725 14.3417 11.8C14.5251 11.875 14.7167 11.9834 14.9251 12.125L17.6834 14.0834C17.9001 14.2334 18.0501 14.4084 18.1417 14.6167C18.2251 14.825 18.2751 15.0334 18.2751 15.2667L18.3084 15.275Z"
      stroke="#F7941D"
      strokeWidth="1.4"
      strokeMiterlimit="10"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      fill="#F7941D"
    />
  </svg>
);

/* ── Chevron Icons for Gallery ────────────────────────────────── */

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RatingFullIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <g clipPath="url(#clip0_2003_1649)">
      <path d="M16.8229 6.111H10.3969L8.41093 0L6.43994 8.083L8.41093 12.223L13.6109 16L11.6249 9.889L16.8229 6.111Z" fill="#E67136"/>
      <path d="M6.426 6.111H0L5.2 9.888L3.213 16L8.413 12.223V0L6.426 6.111Z" fill="#E67136"/>
    </g>
    <defs>
      <clipPath id="clip0_2003_1649">
        <rect width="16.823" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const RatingHalfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
    <path d="M16.8229 6.111H10.3969L8.41093 0L6.43994 8.083L8.41093 12.223L13.6109 16L11.6249 9.889L16.8229 6.111Z" fill="#E67136" fillOpacity="0.5"/>
    <path d="M6.426 6.111H0L5.2 9.888L3.213 16L8.413 12.223V0L6.426 6.111Z" fill="#E67136"/>
  </svg>
);

/* ── Image Gallery with Slideshow ────────────────────────────── */

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const hasMultiple = images.length > 1;

  // Auto-advance every 10 seconds
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!hasMultiple) return;
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 300);
    }, 10000);
  }, [hasMultiple, images.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 300);
      resetTimer();
    },
    [activeIndex, resetTimer]
  );

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, goTo]);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, goTo]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (!thumbnailContainerRef.current || !hasMultiple) return;
    const container = thumbnailContainerRef.current;
    const thumb = container.children[activeIndex] as HTMLElement | undefined;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex, hasMultiple]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative w-full h-[300px] md:h-[430px] rounded-2xl overflow-hidden bg-[#1A1A1D] border border-[#2a2a2d]">
        <Image
          src={images[activeIndex]}
          alt={`${name} - Image ${activeIndex + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={activeIndex === 0}
        />
      </div>

      {/* Thumbnail Strip & Counter (hidden if single image) */}
      {hasMultiple && (
        <div className="relative flex flex-col gap-2.5 items-center">
          {/* Number Counter */}
          <div className="text-white/50 text-[13px] font-normal font-sans">
            {activeIndex + 1} / {images.length}
          </div>

          <div className="flex items-center gap-2 max-w-full self-start">
            {/* Left Arrow */}
            <button
              onClick={goPrev}
              className="shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30 flex items-center justify-center transition-all duration-150 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>

            {/* Scrollable Thumbnails */}
            <div
              ref={thumbnailContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide py-1 min-w-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`shrink-0 relative w-[72px] h-[54px] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    idx === activeIndex
                      ? 'border-[#F7941D] ring-1 ring-[#F7941D]/30'
                      : 'border-transparent hover:border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goNext}
              className="shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30 flex items-center justify-center transition-all duration-150 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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

/* ── Veterinarian Avatar ─────────────────────────────────────── */

const AVATAR_COLORS = [
  { bg: '#C0392B', text: '#FFFFFF' }, // red
  { bg: '#27AE60', text: '#FFFFFF' }, // green
  { bg: '#F7941D', text: '#1D1D1F' }, // yellow/orange
];

function ReviewAvatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(' ')
    .filter((p) => p.length > 0)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

  const colorScheme = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div
      className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
      style={{ background: colorScheme.bg }}
    >
      <span
        style={{
          color: colorScheme.text,
          fontFamily: 'Open Sans',
          fontSize: '16px',
          fontWeight: 400,
          userSelect: 'none',
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function VetAvatar({ vet, index }: { vet: TeamMember; index: number }) {
  const initials = vet.name
    .split(' ')
    .filter((p) => p.length > 0 && p !== 'Dr.')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

  const colorScheme = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
        style={{ background: colorScheme.bg }}
      >
        {vet.image ? (
          <Image src={vet.image} alt={vet.name} fill className="object-cover" />
        ) : (
          <span
            style={{
              color: colorScheme.text,
              fontFamily: 'Open Sans',
              fontSize: '16px',
              fontWeight: 100,
              userSelect: 'none',
            }}
          >
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p
          style={{
            color: '#FFF',
            fontFamily: 'Gabarito',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
          className="truncate"
        >
          {vet.name}
        </p>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
          }}
          className="truncate"
        >
          {vet.specialization}
        </p>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
          }}
        >
          {vet.experience} yrs experience
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */

export default function ListingDetailPage({
  data,
  ctaLabel = 'Book an Appointment',
  backHref = '/vet-finder',
  backLabel = 'Back to Vet Finder',
  aboutHeading = 'About Us',
  teamHeading = 'Our Team',
}: ListingDetailPageProps) {
  const { open, label: statusLabel } = useMemo(
    () => getOpenStatus(data.opening_hours),
    [data.opening_hours]
  );

  const [bookingOpen, setBookingOpen] = useState(false);

  const bookingItem = {
    name: data.name,
    image: data.image ?? undefined,
    street: data.street,
    area: data.area,
    city: data.city,
    phone_number: data.phone_number,
    tags: data.tag_names,
    status: open ? 'Open' : 'Closed',
  };
  const address = [data.street, data.area, data.city]
    .filter(Boolean)
    .join(', ');

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
          href={backHref}
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#F7941D] transition-colors duration-200 text-[14px] mb-6 group"
        >
          <BackIcon />
          <span className="group-hover:underline">{backLabel}</span>
        </Link>

        {/* ── Two-column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 w-full max-w-[860px] flex flex-col gap-6">
            {/* Hero Image / Gallery */}
            {(() => {
              // Build the gallery image list: prefer `images` array, fall back to single `image`
              const galleryImages = data.images && data.images.length > 0
                ? data.images
                : data.image
                  ? [data.image]
                  : [];

              if (galleryImages.length === 0) {
                // No images — show placeholder
                return (
                  <div className="relative w-full h-[300px] md:h-[430px] rounded-2xl overflow-hidden bg-[#1A1A1D] border border-[#2a2a2d]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1a1a1d] to-[#222228]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#3a3a3d" />
                      </svg>
                      <span className="text-white/20 text-sm">{data.name}</span>
                    </div>
                  </div>
                );
              }

              return <ImageGallery images={galleryImages} name={data.name} />;
            })()}

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
                {aboutHeading}
              </h2>
              <p className="text-white/70 text-[15px] leading-[1.7] whitespace-pre-line">
                {data.about}
              </p>
            </div>

            {/* Team */}
            {data.veterinarians.length > 0 && (
              <div
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 240, 222, 0.075)',
                  background: 'rgba(255, 240, 222, 0.075)',
                }}
                className="p-6"
              >
                <h2 className="text-white font-[Gabarito] text-[20px] font-semibold mb-4">
                  {teamHeading}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[...data.veterinarians]
                    .sort((a, b) => a.order - b.order)
                    .map((vet, idx) => (
                      <VetAvatar key={vet.id} vet={vet} index={idx} />
                    ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div
              style={{
                borderRadius: '18px',
                border: '1px solid rgba(255, 240, 222, 0.075)',
                background: 'rgba(255, 240, 222, 0.075)',
              }}
              className="p-6 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-white font-[Gabarito] text-[20px] font-semibold">
                  Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-white font-[Gabarito] text-[18px] font-semibold">4.6</span>
                  <div className="flex items-center gap-1">
                    <RatingFullIcon />
                    <RatingFullIcon />
                    <RatingFullIcon />
                    <RatingFullIcon />
                    <RatingHalfIcon />
                  </div>
                  <span className="text-white/40 text-[14px] font-['Open_Sans']">(34 Reviews)</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="flex flex-col gap-6">
                {[1, 2].map((review, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    {idx > 0 && <div className="h-px bg-white/5 w-full" />}
                    <div className="flex items-start gap-4">
                      <ReviewAvatar name="Victoria S." index={idx} />
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-white font-[Gabarito] text-[16px] font-medium leading-tight">
                          Victoria S.
                        </h3>
                        <span className="text-white/60 font-['Open_Sans'] text-[13px] leading-tight mb-1">
                          Fresno, CA
                        </span>
                        <div className="flex items-center gap-1">
                          <RatingFullIcon />
                          <RatingFullIcon />
                          <RatingFullIcon />
                          <RatingFullIcon />
                          <RatingFullIcon />
                        </div>
                      </div>
                    </div>
                    <p className="text-[#a0a0a0] font-['Open_Sans'] text-[15px] leading-[1.6]">
                      I've never heard of this clinic, but was fortunate enough to receive a voucher for my pup's spay and they took the voucher and had the availability. The staff were very friendly and helpful in making sure I understood everything that was going to happen. The prices are relatively reasonable. They are efficient and the space itself is clean and open.
                    </p>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div className="mt-2">
                <button
                  className="px-5 py-2.5 text-white/90 font-['Open_Sans'] text-[14px] font-medium transition-colors hover:bg-white/10 cursor-pointer"
                  style={{
                    borderRadius: '18px',
                    border: '1px solid rgba(255, 240, 222, 0.10)',
                    background: 'rgba(255, 240, 222, 0.10)',
                  }}
                >
                  View More Reviews
                </button>
              </div>
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
              {/* Panel header gradient stripe */}
              {/* <div className="h-1.5 w-full bg-linear-to-r from-[#F7941D]/60 via-[#F7941D] to-[#F7941D]/60" /> */}

              <div className="p-6 flex flex-col gap-5 my-3">
                {/* Clinic name, tags, and rating */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left Column: Title and Tags */}
                  <div className="flex flex-col gap-3 min-w-0">
                    <h2
                      style={{
                        color: '#FFF',
                        fontFamily: 'Gabarito',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: 'normal',
                      }}
                      className="break-words"
                    >
                      {data.name}
                    </h2>

                    {/* Tags */}
                    {data.tag_names.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {data.tag_names.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              color: '#FFF0DE',
                              fontFamily: '"Open Sans", sans-serif',
                              fontSize: '12px',
                              fontWeight: 300,
                              lineHeight: '17px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 240, 222, 0.10)',
                              background: 'rgba(255, 240, 222, 0.05)',
                              padding: '3px 10px',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Rating */}
                  {data.average_rating > 0 && (
                    <div className="flex items-center gap-1.5 shrink-0 mt-4">
                      <StarIcon />
                      <span
                        style={{
                          color: '#FFF',
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '16px',
                          fontWeight: 300,
                          lineHeight: '22px',
                        }}
                      >
                        {data.average_rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#FFF0DE]/5" />

                {/* Contact Info Section */}
                <div>
                  <p
                    style={{
                      color: '#FFF',
                      fontFamily: 'Gabarito',
                      fontSize: '17px',
                      fontWeight: 300,
                      lineHeight: '15px',
                      marginBottom: '22px',
                    }}
                  >
                    Contact Information
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* Address */}
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
                        {address}
                      </span>
                    </div>

                    {/* Open status */}
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0">
                        <ClockIcon />
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
                        {statusLabel}
                      </span>
                      {open && (
                        <span
                          style={{
                            borderRadius: '8px',
                            border: '1px solid #008236',
                            background: 'rgba(13, 84, 43, 0.40)',
                            color: '#05DF72',
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '12px',
                            fontWeight: 300,
                            lineHeight: '17px',
                            padding: '2px 8px',
                            flexShrink: 0,
                          }}
                        >
                          Open Now
                        </span>
                      )}
                    </div>

                    {/* Website */}
                    {data.website && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0">
                          <GlobeIcon />
                        </span>
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#FFF',
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '16px',
                            fontWeight: 300,
                            lineHeight: '22px',
                          }}
                          className="hover:text-[#F7941D] transition-colors truncate"
                        >
                          {data.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}

                    {/* Phone */}
                    {data.phone_number && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0">
                          <PhoneIcon />
                        </span>
                        <a
                          href={`tel:${data.phone_number}`}
                          style={{
                            color: '#FFF',
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '16px',
                            fontWeight: 300,
                            lineHeight: '22px',
                          }}
                          className="hover:text-[#F7941D] transition-colors"
                        >
                          {data.phone_number}
                        </a>
                      </div>
                    )}

                    {/* WhatsApp */}
                    {data.whatsapp_number && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0">
                          <WhatsAppIcon />
                        </span>
                        <a
                          href={`https://wa.me/${data.whatsapp_number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#FFF',
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '16px',
                            fontWeight: 300,
                            lineHeight: '22px',
                          }}
                          className="hover:text-[#F7941D] transition-colors"
                        >
                          {data.whatsapp_number}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#FFF0DE]/5" />

                {/* Opening Hours */}
                <div>
                  <p
                    style={{
                      color: '#FFF',
                      fontFamily: 'Gabarito',
                      fontSize: '17px',
                      fontWeight: 300,
                      lineHeight: '20px',
                      marginBottom: '22px',
                    }}
                  >
                    Opening Hours
                  </p>
                  <div className="flex flex-col gap-1">
                    {DAYS_ORDER.map((day) => {
                      const hours = data.opening_hours[day];
                      const isToday = day === getTodayKey();
                      return (
                        <div
                          key={day}
                          className={`flex items-center justify-between py-1 px-2 rounded-lg ${
                            isToday ? 'bg-[#F7941D]/6' : ''
                          }`}
                        >
                          <span
                            style={{
                              color: isToday ? '#F7941D' : '#FFF0DE',
                              fontFamily: '"Open Sans", sans-serif',
                              fontSize: '15px',
                              fontWeight: 300,
                              lineHeight: '20px',
                            }}
                          >
                            {capitalise(day)}
                          </span>
                          <span
                            style={{
                              color: '#FFF',
                              fontFamily: '"Open Sans", sans-serif',
                              fontSize: '15px',
                              fontWeight: 300,
                              lineHeight: '20px',
                            }}
                          >
                            {hours
                              ? `${formatTime(hours.open)} - ${formatTime(hours.close)}`
                              : 'Closed'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#FFF0DE]/5" />

                {/* CTA — Book an Appointment */}
                <button
                  id={`vet-detail-cta-${data.id}`}
                  onClick={() => setBookingOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] text-[14px] font-semibold leading-[20px] transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98] cursor-pointer"
                >
                  <BookmarkIcon />
                  {ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        item={bookingItem}
      />
    </section>
  );
}
