'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export interface Veterinarian {
  id: number;
  image: string | null;
  name: string;
  specialization: string;
  experience: number;
  order: number;
}

export interface VetDetailData {
  id: number;
  image: string | null;
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
  veterinarians: Veterinarian[];
  created_at: string;
  updated_at: string;
}

interface VetDetailPageProps {
  data: VetDetailData;
  /** Label for the CTA button. Defaults to "Book an Appointment" */
  ctaLabel?: string;
  /** Back link href — defaults to "/vet-finder" */
  backHref?: string;
  /** Back link label */
  backLabel?: string;
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
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.68323 1.53003C7.71245 1.471 7.75758 1.42132 7.81353 1.38658C7.86949 1.35184 7.93404 1.33344 7.9999 1.33344C8.06576 1.33344 8.13031 1.35184 8.18626 1.38658C8.24222 1.42132 8.28735 1.471 8.31656 1.53003L9.85656 4.64936C9.95802 4.85468 10.1078 5.0323 10.293 5.167C10.4782 5.3017 10.6933 5.38944 10.9199 5.4227L14.3639 5.9267C14.4292 5.93615 14.4905 5.96368 14.5409 6.00616C14.5913 6.04865 14.6288 6.1044 14.6492 6.1671C14.6696 6.22981 14.6721 6.29697 14.6563 6.36099C14.6405 6.42501 14.6071 6.48333 14.5599 6.52936L12.0692 8.9547C11.905 9.11477 11.7821 9.31235 11.7111 9.53045C11.6402 9.74855 11.6233 9.98062 11.6619 10.2067L12.2499 13.6334C12.2614 13.6986 12.2544 13.7657 12.2296 13.8272C12.2048 13.8886 12.1632 13.9418 12.1096 13.9807C12.056 14.0196 11.9925 14.0427 11.9265 14.0473C11.8604 14.0519 11.7944 14.0378 11.7359 14.0067L8.65723 12.388C8.45438 12.2815 8.22868 12.2259 7.99956 12.2259C7.77044 12.2259 7.54475 12.2815 7.3419 12.388L4.2639 14.0067C4.20545 14.0376 4.1395 14.0516 4.07353 14.0469C4.00757 14.0422 3.94424 14.0191 3.89076 13.9802C3.83728 13.9413 3.79579 13.8882 3.771 13.8268C3.74622 13.7655 3.73914 13.6985 3.75056 13.6334L4.3379 10.2074C4.37669 9.98119 4.35989 9.74896 4.28892 9.53073C4.21796 9.31249 4.09497 9.1148 3.93056 8.9547L1.4399 6.53003C1.39229 6.48405 1.35856 6.42563 1.34254 6.36141C1.32652 6.2972 1.32886 6.22978 1.34928 6.16682C1.36971 6.10387 1.40741 6.04793 1.45808 6.00535C1.50876 5.96278 1.57037 5.9353 1.6359 5.92603L5.07923 5.4227C5.30607 5.3897 5.52149 5.30207 5.70695 5.16736C5.89242 5.03264 6.04237 4.85488 6.1439 4.64936L7.68323 1.53003Z"
      fill="#F7941D" stroke="#F7941D" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M16.6667 8.33335C16.6667 12.4942 12.0509 16.8275 10.5009 18.1659C10.3565 18.2744 10.1807 18.3331 10 18.3331C9.81938 18.3331 9.6436 18.2744 9.49921 18.1659C7.94921 16.8275 3.33337 12.4942 3.33337 8.33335C3.33337 6.56524 4.03575 4.86955 5.286 3.61931C6.53624 2.36907 8.23193 1.66669 10 1.66669C11.7682 1.66669 13.4638 2.36907 14.7141 3.61931C15.9643 4.86955 16.6667 6.56524 16.6667 8.33335Z" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71402 12.5 8.33331C12.5 6.9526 11.3807 5.83331 10 5.83331C8.61929 5.83331 7.5 6.9526 7.5 8.33331C7.5 9.71402 8.61929 10.8333 10 10.8333Z" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M10 5V10L13.3333 11.6667" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.66669C10 1.66669 6.66667 5.00002 6.66667 10C6.66667 15 10 18.3334 10 18.3334M10 1.66669C10 1.66669 13.3333 5.00002 13.3333 10C13.3333 15 10 18.3334 10 18.3334M10 1.66669C5.39763 1.66669 1.66667 5.39765 1.66667 10C1.66667 14.6024 5.39763 18.3334 10 18.3334M10 1.66669C14.6024 1.66669 18.3333 5.39765 18.3333 10C18.3333 14.6024 14.6024 18.3334 10 18.3334M1.66667 10H18.3333" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M18.3084 15.275C18.3084 15.575 18.2417 15.8834 18.1001 16.1834C17.9584 16.4834 17.7751 16.7667 17.5334 17.0334C17.1251 17.4834 16.6751 17.8084 16.1667 18.0167C15.6667 18.225 15.1251 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.8251 17.725C10.8667 17.3167 9.90839 16.7667 8.95839 16.075C8.00006 15.375 7.09172 14.6 6.22506 13.7417C5.36672 12.875 4.59172 11.9667 3.90006 11.0167C3.21672 10.0667 2.66672 9.11669 2.26672 8.17502C1.86672 7.22502 1.66672 6.31669 1.66672 5.45002C1.66672 4.88336 1.76672 4.34169 1.96672 3.84169C2.16672 3.33336 2.48339 2.86669 2.92506 2.45002C3.45839 1.92502 4.04172 1.66669 4.65839 1.66669C4.89172 1.66669 5.12506 1.71669 5.33339 1.81669C5.55006 1.91669 5.74172 2.06669 5.89172 2.28336L7.82506 5.00836C7.97506 5.21669 8.08339 5.40836 8.15839 5.59169C8.23339 5.76669 8.27506 5.94169 8.27506 6.10002C8.27506 6.30002 8.21672 6.50002 8.10006 6.69169C7.99172 6.88336 7.83339 7.08336 7.63339 7.28336L7.00006 7.94169C6.90839 8.03336 6.86672 8.14169 6.86672 8.27502C6.86672 8.34169 6.87506 8.40002 6.89172 8.46669C6.91672 8.53336 6.94172 8.58336 6.95839 8.63336C7.10839 8.90836 7.36672 9.26669 7.73339 9.70002C8.10839 10.1334 8.50839 10.575 8.94172 11.0167C9.39172 11.4584 9.82506 11.8667 10.2667 12.2417C10.7001 12.6084 11.0584 12.8584 11.3417 13.0084L11.4917 13.075C11.5417 13.0917 11.6001 13.1 11.6667 13.1C11.8084 13.1 11.9167 13.05 12.0084 12.9584L12.6417 12.3334C12.8501 12.125 13.0501 11.9667 13.2417 11.8667C13.4334 11.75 13.6251 11.6917 13.8334 11.6917C13.9917 11.6917 14.1584 11.725 14.3417 11.8C14.5251 11.875 14.7167 11.9834 14.9251 12.125L17.6834 14.0834C17.9001 14.2334 18.0501 14.4084 18.1417 14.6167C18.2251 14.825 18.2751 15.0334 18.2751 15.2667L18.3084 15.275Z" stroke="#F7941D" strokeWidth="1.4" strokeMiterlimit="10" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#F7941D"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M13.3333 1.66669V5.00002M6.66667 1.66669V5.00002M2.5 8.33335H17.5M4.16667 3.33335H15.8333C16.7538 3.33335 17.5 4.07954 17.5 5.00002V16.6667C17.5 17.5872 16.7538 18.3334 15.8333 18.3334H4.16667C3.24619 18.3334 2.5 17.5872 2.5 16.6667V5.00002C2.5 4.07954 3.24619 3.33335 4.16667 3.33335Z" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Veterinarian Avatar ─────────────────────────────────────── */

function VetAvatar({ vet }: { vet: Veterinarian }) {
  const initials = vet.name
    .split(' ')
    .filter((p) => p.length > 0 && p !== 'Dr.')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1f1f22] border border-[#2a2a2d] hover:border-[#F7941D]/30 transition-colors duration-200">
      <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden bg-[#F7941D]/20 flex items-center justify-center">
        {vet.image ? (
          <Image src={vet.image} alt={vet.name} fill className="object-cover" />
        ) : (
          <span className="text-[#F7941D] font-[Gabarito] text-[16px] font-bold select-none">
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-white font-[Gabarito] text-[14px] font-medium leading-tight truncate">{vet.name}</p>
        <p className="text-[#F7941D] font-[family-name:var(--font-opensans)] text-[12px] leading-tight truncate">{vet.specialization}</p>
        <p className="text-white/40 font-[family-name:var(--font-opensans)] text-[11px]">{vet.experience} yrs experience</p>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */

export default function VetDetailPage({
  data,
  ctaLabel = 'Book an Appointment',
  backHref = '/vet-finder',
  backLabel = 'Back to Vet Finder',
}: VetDetailPageProps) {
  const { open, label: statusLabel } = useMemo(
    () => getOpenStatus(data.opening_hours),
    [data.opening_hours]
  );

  const address = [data.street, data.area, data.city].filter(Boolean).join(', ');

  return (
    <section className="relative min-h-screen overflow-hidden font-[family-name:var(--font-opensans)]">
      {/* ── Background Rectangle ── */}
      <div className="absolute -top-5 inset-x-0 z-0 flex justify-center pointer-events-none mt-9">
        <div
          className="w-full h-[750px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(136, 136, 136, 0.00) 0%, rgba(104, 104, 104, 0.25) 50%, rgba(136, 136, 136, 0.00) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-20">

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
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Hero Image */}
            <div className="relative w-full h-[300px] md:h-[380px] rounded-2xl overflow-hidden bg-[#1A1A1D] border border-[#2a2a2d]">
              {data.image ? (
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1a1a1d] to-[#222228]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#3a3a3d"/>
                  </svg>
                  <span className="text-white/20 text-sm">{data.name}</span>
                </div>
              )}
              {/* Rating badge overlay */}
              {data.average_rating > 0 && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <StarIcon />
                  <span className="text-white font-[Gabarito] text-[15px] font-medium">{data.average_rating}</span>
                </div>
              )}
            </div>

            {/* Name + Tags row */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-white font-[Gabarito] text-[28px] md:text-[34px] font-bold leading-tight">
                  {data.name}
                </h1>
                {data.average_rating > 0 && (
                  <div className="hidden lg:flex items-center gap-1 shrink-0">
                    <StarIcon />
                    <span className="text-white font-[Gabarito] text-[18px] font-medium">{data.average_rating}</span>
                  </div>
                )}
              </div>
              {data.tag_names.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.tag_names.map((tag) => (
                    <span
                      key={tag}
                      className="text-[#FFF0DE] font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] bg-[#2a2a2d] rounded-full px-3 py-1 border border-[#3a3a3d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <div className="rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] p-6">
              <h2 className="text-white font-[Gabarito] text-[20px] font-semibold mb-3">About Us</h2>
              <p className="text-white/70 text-[15px] leading-[1.7] whitespace-pre-line">{data.about}</p>
            </div>

            {/* Services */}
            {data.service_names.length > 0 && (
              <div className="rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] p-6">
                <h2 className="text-white font-[Gabarito] text-[20px] font-semibold mb-4">Our Services</h2>
                <div className="flex flex-wrap gap-2.5">
                  {data.service_names.map((service) => (
                    <span
                      key={service}
                      className="flex items-center gap-2 text-white/80 font-[family-name:var(--font-opensans)] text-[13px] bg-[#F7941D]/10 border border-[#F7941D]/20 rounded-full px-3.5 py-1.5 hover:bg-[#F7941D]/20 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F7941D] shrink-0" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {data.veterinarians.length > 0 && (
              <div className="rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] p-6">
                <h2 className="text-white font-[Gabarito] text-[20px] font-semibold mb-4">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[...data.veterinarians]
                    .sort((a, b) => a.order - b.order)
                    .map((vet) => (
                      <VetAvatar key={vet.id} vet={vet} />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — Sticky Info Panel ── */}
          <div className="w-full lg:w-[340px] xl:w-[370px] shrink-0">
            <div className="lg:sticky lg:top-24 rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] overflow-hidden">

              {/* Panel header gradient stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#F7941D]/60 via-[#F7941D] to-[#F7941D]/60" />

              <div className="p-6 flex flex-col gap-5">

                {/* Clinic name (mobile/panel) */}
                <div>
                  <h2 className="text-white font-[Gabarito] text-[20px] font-semibold leading-tight mb-1">
                    {data.name}
                  </h2>
                  {data.average_rating > 0 && (
                    <div className="flex items-center gap-1.5">
                      <StarIcon />
                      <span className="text-white font-[Gabarito] text-[15px]">{data.average_rating}</span>
                    </div>
                  )}
                </div>

                {/* Contact Info Section */}
                <div>
                  <p className="text-[#F7941D] font-[Gabarito] text-[13px] font-semibold uppercase tracking-wider mb-3">
                    Contact Information
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* Address */}
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 mt-0.5"><LocationIcon /></span>
                      <span className="text-white/80 text-[14px] leading-[1.5]">{address}</span>
                    </div>

                    {/* Open status */}
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0"><ClockIcon /></span>
                      <span className="text-white/80 text-[14px]">{statusLabel}</span>
                      <span
                        className={`ml-auto shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          open
                            ? 'text-[#05DF72] bg-[#05DF72]/10 border-[#05DF72]/30'
                            : 'text-red-400 bg-red-400/10 border-red-400/30'
                        }`}
                      >
                        {open ? 'Open Now' : 'Closed'}
                      </span>
                    </div>

                    {/* Website */}
                    {data.website && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0"><GlobeIcon /></span>
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F7941D] text-[14px] hover:underline truncate"
                        >
                          {data.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}

                    {/* Phone */}
                    {data.phone_number && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0"><PhoneIcon /></span>
                        <a
                          href={`tel:${data.phone_number}`}
                          className="text-white/80 text-[14px] hover:text-[#F7941D] transition-colors"
                        >
                          {data.phone_number}
                        </a>
                      </div>
                    )}

                    {/* WhatsApp */}
                    {data.whatsapp_number && (
                      <div className="flex items-center gap-2.5">
                        <span className="shrink-0"><WhatsAppIcon /></span>
                        <a
                          href={`https://wa.me/${data.whatsapp_number.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 text-[14px] hover:text-[#F7941D] transition-colors"
                        >
                          {data.whatsapp_number}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#2a2a2d]" />

                {/* Opening Hours */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarIcon />
                    <p className="text-[#F7941D] font-[Gabarito] text-[13px] font-semibold uppercase tracking-wider">
                      Opening Hours
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {DAYS_ORDER.map((day) => {
                      const hours = data.opening_hours[day];
                      const isToday = day === getTodayKey();
                      return (
                        <div
                          key={day}
                          className={`flex items-center justify-between text-[13px] py-1 px-2 rounded-lg transition-colors ${
                            isToday ? 'bg-[#F7941D]/8 border border-[#F7941D]/15' : ''
                          }`}
                        >
                          <span className={`font-medium ${isToday ? 'text-[#F7941D]' : 'text-white/60'}`}>
                            {capitalise(day)}
                          </span>
                          <span className={isToday ? 'text-white font-semibold' : 'text-white/50'}>
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
                <div className="h-px bg-[#2a2a2d]" />

                {/* CTA */}
                <button
                  id={`vet-detail-cta-${data.id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] font-[family-name:var(--font-opensans)] text-[15px] font-semibold leading-[20px] transition-all duration-300 hover:bg-[#d87c12] hover:shadow-[0_4px_20px_rgba(247,148,29,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <CalendarIcon />
                  {ctaLabel}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
