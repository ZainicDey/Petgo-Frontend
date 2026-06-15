'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { ListingData } from './ListingCard';

/* ── Icons ─────────────────────────────────────────────────── */

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M4.16663 10H15.8333"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 4.16669L15.8333 10L10 15.8334"
      stroke="currentColor"
      strokeWidth="2"
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
      d="M16.6663 8.33335C16.6663 12.4942 12.0505 16.8275 10.5005 18.1659C10.3561 18.2744 10.1803 18.3331 9.99967 18.3331C9.81901 18.3331 9.64324 18.2744 9.49884 18.1659C7.94884 16.8275 3.33301 12.4942 3.33301 8.33335C3.33301 6.56524 4.03539 4.86955 5.28563 3.61931C6.53587 2.36907 8.23156 1.66669 9.99967 1.66669C11.7678 1.66669 13.4635 2.36907 14.7137 3.61931C15.964 4.86955 16.6663 6.56524 16.6663 8.33335Z"
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
);

const ClockIcon = () => (
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
);

const CallIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip_call)">
      <path
        d="M12.5415 4.16665C13.3555 4.32545 14.1035 4.72353 14.6899 5.30993C15.2763 5.89632 15.6744 6.64437 15.8332 7.45831M12.5415 0.833313C14.2326 1.02118 15.8095 1.77846 17.0134 2.98082C18.2173 4.18318 18.9765 5.75915 19.1665 7.44998M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2744C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.2599 16.7477 18.2875 16.5165 18.2666C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53432 2.04007 6.05914 1.76653 3.48331C1.7457 3.25287 1.77309 3.02061 1.84695 2.80133C1.9208 2.58205 2.03951 2.38055 2.1955 2.20966C2.3515 2.03877 2.54137 1.90224 2.75302 1.80875C2.96468 1.71526 3.19348 1.66686 3.42486 1.66665H5.92486C6.32928 1.66267 6.72136 1.80588 7.028 2.06959C7.33464 2.3333 7.53493 2.69952 7.59153 3.09998C7.69705 3.90003 7.89274 4.68559 8.17486 5.44165C8.28698 5.73992 8.31125 6.06408 8.24478 6.37571C8.17832 6.68735 8.02392 6.97341 7.79986 7.19998L6.74153 8.25831C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.9759 13.3125 11.8215 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4654 17.6744 12.6693 17.9386 12.9812C18.2029 13.2931 18.3433 13.6913 18.3332 14.1Z"
        stroke="#1D1D1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip_call">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M17.0502 2.91C16.1332 1.98392 15.0411 1.24965 13.8376 0.750437C12.634 0.251219 11.3432 -0.00317281 10.0402 1.03455e-05C4.5802 1.03455e-05 0.130196 4.45001 0.130196 9.91001C0.130196 11.66 0.590196 13.36 1.4502 14.86L0.0502005 20L5.3002 18.63C6.7502 19.41 8.3802 19.82 10.0402 19.82C15.5002 19.82 19.9502 15.37 19.9502 9.91001C19.9502 7.25001 18.9302 4.73001 17.0502 2.91ZM10.0402 18.15C8.5602 18.15 7.1102 17.75 5.8402 17L5.5402 16.82L2.4202 17.64L3.2502 14.6L3.0502 14.29C2.22753 12.977 1.79189 11.4594 1.7902 9.91001C1.7902 5.37001 5.4902 1.67001 10.0302 1.67001C12.2302 1.67001 14.3002 2.53001 15.8502 4.09001C16.6177 4.85389 17.2257 5.76261 17.6393 6.76306C18.0529 7.76352 18.264 8.83554 18.2602 9.91801C18.2802 14.45 14.5802 18.15 10.0402 18.15ZM14.5602 11.99C14.3102 11.87 13.0902 11.27 12.8702 11.18C12.6402 11.1 12.4802 11.06 12.3102 11.3C12.1402 11.55 11.6702 12.11 11.5302 12.27C11.3902 12.44 11.2402 12.46 10.9902 12.33C10.7402 12.21 9.9402 11.94 9.0002 11.1C8.2602 10.44 7.7702 9.63001 7.6202 9.38001C7.4802 9.13001 7.6002 9.00001 7.7302 8.87001C7.8402 8.76001 7.9802 8.58001 8.1002 8.44001C8.2202 8.30001 8.2702 8.19001 8.3502 8.03001C8.4302 7.86001 8.3902 7.72001 8.3302 7.60001C8.2702 7.48001 7.7702 6.26001 7.5702 5.76001C7.3802 5.28001 7.1802 5.34001 7.0302 5.33001H6.5602C6.3902 5.33001 6.1302 5.39001 5.9002 5.64001C5.6802 5.89001 5.0402 6.49001 5.0402 7.71001C5.0402 8.93001 5.9302 10.11 6.0502 10.27C6.1702 10.44 7.7702 12.94 10.2502 14.01C10.8402 14.27 11.3002 14.42 11.6602 14.53C12.2502 14.72 12.7902 14.69 13.2202 14.63C13.7002 14.56 14.6902 14.03 14.8902 13.45C15.1002 12.87 15.1002 12.38 15.0302 12.27C14.9602 12.16 14.8102 12.11 14.5602 11.99Z"
      fill="white"
    />
  </svg>
);

interface BookingItemType {
  name: string;
  image?: string;
  street?: string;
  area?: string;
  city?: string;
  phone_number?: string;
  tags?: string[];
  status?: string;
}

/* ── Shared Card Preview (left side of modal) ────────────── */

interface ModalCardPreviewProps {
  item: BookingItemType;
}

function ModalCardPreview({ item }: ModalCardPreviewProps) {
  const tags = item.tags ? item.tags.slice(0, 3) : [];
  const locationText = item.street 
    ? `${item.street}, ${item.area || ''}, ${item.city || ''}` 
    : (item.area || 'Location not specified');

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] w-full">
      {/* Image */}
      {item.image && (
        <div className="relative w-full aspect-[16/9] md:aspect-[6/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-4 gap-3">
        {/* Name & Rating */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-[Gabarito] text-[24px] font-medium leading-normal line-clamp-1">
            {item.name}
          </h3>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[#FFF0DE] font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] bg-[#2a2a2d] rounded-full px-2.5 py-0.5 border border-[#3a3a3d]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <LocationIcon />
          <span className="line-clamp-1">{locationText}</span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-[#D1D5DC] font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          <ClockIcon />
          <span>Available for Services</span>
          <span className={`px-2 py-0.5 rounded-full font-[family-name:var(--font-opensans)] text-[12px] font-normal leading-[17px] ${
            item.status === 'Open'
              ? 'text-[#05DF72] bg-[#05DF72]/10 border border-[#05DF72]/30'
              : 'text-red-400 bg-red-400/10 border border-red-400/30'
          }`}>
            {item.status === 'Open' ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Appointment Form ────────────────────────────── */

interface Step1Props {
  item: BookingItemType;
  name: string;
  phone: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onNext: () => void;
}

function Step1({
  item,
  name,
  phone,
  onNameChange,
  onPhoneChange,
  onNext,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header Wrapper */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h2
          style={{
            color: '#FFF',
            fontFamily: '"Gabarito", sans-serif',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
          }}
        >
          Book your Appointment
        </h2>

        {/* Description */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
        >
          Enter your details to contact {item.name} for booking information.
        </p>
      </div>

      {/* Inputs Group Wrapper */}
      <div className="flex flex-col gap-2">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#F7941D]/60 transition-colors"
          style={{
            display: 'flex',
            padding: '16px 4px 16px 24px',
            alignItems: 'center',
            gap: '24px',
            alignSelf: 'stretch',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: '#1D1D1F',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
          }}
        />

        {/* Phone Input */}
        <div
          className="flex items-center w-full focus-within:border-[#F7941D]/60 transition-colors"
          style={{
            padding: '0 4px 0 0',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            background: '#1D1D1F',
          }}
        >
          <span
            className="shrink-0 text-white select-none"
            style={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '20px',
              padding: '16px 20px 16px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRight: '1px solid rgba(255, 255, 255, 0.0)',
              borderTopLeftRadius: '17px',
              borderBottomLeftRadius: '17px',
            }}
          >
            +880
          </span>
          <input
            type="tel"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
            style={{
              padding: '16px 4px 16px 12px',
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
            }}
          />
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Next
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Step 2: Contact Info ────────────────────────────────── */

interface Step2Props {
  item: BookingItemType;
  onContinue: () => void;
}

function Step2({ item, onContinue }: Step2Props) {
  const phoneNumber = item.phone_number || '+8801966-440001';

  return (
    <div className="flex flex-col gap-4">
      {/* Thank you */}
      <p
        style={{
          color: '#F7941D',
          fontFamily: '"Gabarito", sans-serif',
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 'normal',
        }}
      >
        Thank you!
      </p>

      {/* Title */}
      <h2
        style={{
          color: '#FFF',
          fontFamily: '"Gabarito", sans-serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
          marginTop: '-8px',
        }}
      >
        Book your Appointment
      </h2>

      {/* Description */}
      <p
        style={{
          color: 'rgba(255, 255, 255, 0.60)',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        Contact {item.name} from the information given below
      </p>

      {/* Mobile Number */}
      <div className="flex items-center gap-2">
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.50)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          Mobile.
        </span>
        <span
          style={{
            color: '#FFF',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          {phoneNumber}
        </span>
      </div>

      {/* Call Now Button */}
      <button
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#F7941D] text-[#1D1D1F] cursor-pointer transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
        onClick={() => window.open(`tel:${phoneNumber}`)}
      >
        <CallIcon />
        Call Now
      </button>

      {/* WhatsApp Button */}
      <button
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-[#128C7E] text-white cursor-pointer transition-colors duration-300 hover:bg-[#0e7a6d] active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
        onClick={() =>
          window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`)
        }
      >
        <WhatsappIcon />
        Whatsapp
      </button>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-[18px] bg-transparent text-white border border-white/25 cursor-pointer transition-colors duration-300 hover:border-[#F7941D]/40 active:scale-[0.98]"
        style={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
        }}
      >
        Continue
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ── Main Modal Shell ────────────────────────────────────────── */

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BookingItemType;
  hideCard?: boolean;
}

function ModalShell({
  children,
  onClose,
  onClick,
  style,
  className = '',
  onTransitionEnd,
  hideCard = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  onTransitionEnd?: (e: React.TransitionEvent) => void;
  hideCard?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col bg-[#111111] border border-[#2a2a2d] rounded-2xl w-full min-h-[500px] overflow-y-auto shadow-2xl ${
        hideCard ? 'max-w-[500px] max-h-[80vh]' : 'max-w-[1000px] max-h-[90vh]'
      } ${className}`}
      onClick={onClick}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-1.5 cursor-pointer rounded-full hover:bg-[#2a2a2d]"
        aria-label="Close modal"
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  item,
  hideCard = false,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Animation states: 'idle' = step1 only, 'entering' = step2 sliding in, 'done' = step2 settled
  const [animState, setAnimState] = useState<'idle' | 'entering' | 'done'>(
    'idle'
  );

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setName('');
      setPhone('');
      setAnimState('idle');
    }
  }, [isOpen]);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setStep(2);
    setAnimState('idle');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimState('entering');
      });
    });
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== e.currentTarget) return;
      if (animState === 'entering') {
        setAnimState('done');
      }
    },
    [animState]
  );

  if (!isOpen) return null;

  const step2Active = step === 2;
  const step2Visible =
    step2Active && (animState === 'entering' || animState === 'done');

  const modalContent = (rightSide: React.ReactNode) => (
    <div className="flex flex-col flex-1 justify-center items-center w-full py-8">
      {hideCard ? (
        /* Single Column Layout (No Card) */
        <div className="w-full px-8 flex flex-col justify-start">
          {rightSide}
        </div>
      ) : (
        /* Split Layout (With Card) */
        <div className="flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-start w-full mx-auto max-w-[1000px]">
          {/* Left Side – Card Preview */}
          <div className="w-full md:w-[56%] p-6 md:p-8 md:pr-0">
            <ModalCardPreview item={item} />
          </div>
          {/* Right Side */}
          <div className="w-full md:w-[50%] p-6 md:p-8 md:pl-0 flex flex-col justify-start">
            {rightSide}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* ── Step 1 Modal ── blurs & fades when step2 enters */}
      <ModalShell
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        className="animate-in zoom-in-95 duration-200"
        hideCard={hideCard}
        style={{
          transition:
            'opacity 0.45s ease, filter 0.45s ease, transform 0.45s ease',
          opacity: step2Visible ? 0 : 1,
          filter: step2Visible ? 'blur(10px)' : 'blur(0px)',
          transform: step2Visible ? 'scale(0.96)' : 'scale(1)',
          ...(animState === 'done' ? { display: 'none' as const } : {}),
        }}
      >
        {modalContent(
          <Step1
            item={item}
            name={name}
            phone={phone}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onNext={handleNext}
          />
        )}
      </ModalShell>

      {/* ── Step 2 Modal ── slides in from the right */}
      {step2Active && (
        <ModalShell
          onClose={onClose}
          onClick={(e) => e.stopPropagation()}
          onTransitionEnd={handleTransitionEnd}
          hideCard={hideCard}
          style={{
            position: 'absolute',
            transition:
              'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: animState === 'idle' ? 0 : 1,
            transform:
              animState === 'idle' ? 'translateX(80px)' : 'translateX(0)',
          }}
        >
          {modalContent(<Step2 item={item} onContinue={onClose} />)}
        </ModalShell>
      )}
    </div>
  );
}
