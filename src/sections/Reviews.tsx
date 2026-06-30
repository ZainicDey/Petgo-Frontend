'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

import review1 from '@/assets/images/Review1.png';
import review2 from '@/assets/images/Review2.png';
import review3 from '@/assets/images/Review3.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

/* ─── Review Data ─── */
interface Review {
  id: number;
  name: string;
  subtitle: string;
  image: StaticImageData;
  review: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'ASHRAFUL KHAN',
    subtitle: 'Has One Dog',
    image: review1,
    review:
      "PetGo changed how I care for my dog. I can track him when he's out, book vet appointments with a tap, and even connect with other pet lovers. It's not just an app—it's peace of mind. I finally feel like I have the support I need as a pet parent.",
  },
  {
    id: 2,
    name: 'TAHMINA AHMED',
    subtitle: 'Loves her Rabbit',
    image: review2,
    review:
      "PetGo changed how I care for my dog. I can track him when he's out, book vet appointments with a tap, and even connect with other pet lovers. It's not just an app—it's peace of mind. I finally feel like I have the support I need as a pet parent.",
  },
  {
    id: 3,
    name: 'FEROZA AKTER',
    subtitle: 'Has a Talking Parrot',
    image: review3,
    review:
      "PetGo changed how I care for my dog. I can track him when he's out, book vet appointments with a tap, and even connect with other pet lovers. It's not just an app—it's peace of mind. I finally feel like I have the support I need as a pet parent.",
  },
  {
    id: 4,
    name: 'FEROZA AKTER',
    subtitle: 'Has a Talking Parrot',
    image: review3,
    review:
      "PetGo changed how I care for my dog. I can track him when he's out, book vet appointments with a tap, and even connect with other pet lovers. It's not just an app—it's peace of mind. I finally feel like I have the support I need as a pet parent.",
  },
  {
    id: 5,
    name: 'FEROZA AKTER',
    subtitle: 'Has a Talking Parrot',
    image: review3,
    review:
      "PetGo changed how I care for my dog. I can track him when he's out, book vet appointments with a tap, and even connect with other pet lovers. It's not just an app—it's peace of mind. I finally feel like I have the support I need as a pet parent.",
  },
];

/* ─── Quote Mark SVG ─── */
function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
    >
      <path
        d="M5.85645 0C7.26427 5.54236e-05 8.44828 0.447876 9.4082 1.34375C10.4322 2.17575 11.1999 3.2644 11.7119 4.6084C12.2878 5.95234 12.5762 7.42451 12.5762 9.02441C12.5761 10.3683 12.3523 11.8406 11.9043 13.4404C11.5203 14.9763 10.8486 16.4803 9.88867 17.9521C8.92867 19.3601 7.64785 20.5756 6.04785 21.5996C4.51186 22.6236 2.59206 23.2962 0.288086 23.6162V17.9521C2.33591 17.5682 3.93591 16.7042 5.08789 15.3604C6.0382 14.1989 6.59534 12.9062 6.76172 11.4834C6.37303 11.5702 6.07162 11.6162 5.85645 11.6162C4.19245 11.6162 2.78383 11.0724 1.63184 9.98438C0.543933 8.89647 9.72652e-05 7.52025 0 5.85645C0 4.19244 0.543836 2.81554 1.63184 1.72754C2.78383 0.575577 4.19247 0 5.85645 0ZM20.9277 0C22.3357 0 23.5205 0.44775 24.4805 1.34375C25.5044 2.17575 26.2722 3.26442 26.7842 4.6084C27.3601 5.95231 27.6484 7.42455 27.6484 9.02441C27.6484 10.3683 27.4245 11.8406 26.9766 13.4404C26.5925 14.9763 25.9199 16.4802 24.96 17.9521C24 19.36 22.72 20.5757 21.1201 21.5996C19.5841 22.6236 17.6643 23.2962 15.3604 23.6162V17.9521C17.4082 17.5682 19.0082 16.7042 20.1602 15.3604C21.1104 14.1989 21.6666 12.9062 21.833 11.4834C21.4445 11.5701 21.1428 11.6162 20.9277 11.6162C19.264 11.6161 17.856 11.0722 16.7041 9.98438C15.6162 8.89647 15.0724 7.52025 15.0723 5.85645C15.0723 4.19244 15.6161 2.81554 16.7041 1.72754C17.856 0.575768 19.264 0.000103864 20.9277 0Z"
        fill="white"
      />
    </svg>
  );
}

/* ─── Review Card ─── */
function ReviewCard({ review }: { review: Review }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[300px] sm:w-[420px] h-[400px] rounded-[20px] overflow-hidden cursor-pointer shrink-0 select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={review.image}
        alt={review.name}
        fill
        className={`
          object-cover transition-all duration-300 ease-in-out z-0
          ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
        `}
      />

      {/* ── The Expanding Background Box ── */}
      <div
        className={`absolute shadow-lg transition-all duration-300 ease-in-out z-10
          ${
            isHovered
              ? 'w-full h-full left-0 bottom-0 rounded-[20px] bg-white'
              : 'w-[60px] h-[60px] left-5 bottom-4 rounded-xl bg-[#BE1E2D]'
          }
        `}
      />

      {/* ── Content Layer ── */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-20">
        {/* Review Text (fades in) */}
        <div
          className={`p-6 sm:p-8 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p
            className="text-[#1a1a1a] text-[15px] sm:text-[19px] leading-relaxed font-normal mt-4"
            style={{ fontFamily: 'var(--font-opensans)' }}
          >
            {review.review}
          </p>
        </div>

        {/* Bottom part: Quote Icon + Name */}
        <div className="flex items-center gap-3 px-5 py-4 mt-auto">
          {/* Transparent container for quote icon, background is handled by the expanding div */}
          <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">
            <QuoteIcon
              className={`w-6 h-5 transition-colors duration-300 ease-in-out ${isHovered ? 'text-[#BE1E2D]' : 'text-white'}`}
            />
          </div>
          <div>
            <p
              className={`text-[16px] md:text-[18px] font-bold uppercase tracking-wide leading-tight transition-colors duration-300 ease-in-out ${isHovered ? 'text-[#1a1a1a] drop-shadow-none' : 'text-white drop-shadow-lg'}`}
            >
              {review.name}
            </p>
            <p
              className={`text-[13px] md:text-[14px] font-normal leading-tight transition-colors duration-300 ease-in-out ${isHovered ? 'text-[#1a1a1a]/60 drop-shadow-none' : 'text-white/80 drop-shadow-lg'}`}
            >
              {review.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Large Decorative Quote Marks ─── */
function LargeOpenQuote({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      className={className}
    >
      <path
        d="M21.792 23.6162C20.3842 23.6162 19.2002 23.1683 18.2402 22.2725C17.2162 21.4405 16.4485 20.3518 15.9365 19.0078C15.3606 17.6639 15.0723 16.1917 15.0723 14.5918C15.0723 13.2479 15.2962 11.7756 15.7441 10.1758C16.1281 8.63995 16.7999 7.1359 17.7598 5.66406C18.7198 4.25606 20.0006 3.0406 21.6006 2.0166C23.1366 0.99262 25.0564 0.319996 27.3604 0V5.66406C25.3125 6.04803 23.7125 6.91206 22.5605 8.25586C21.6102 9.41735 21.0531 10.71 20.8867 12.1328C21.2754 12.046 21.5768 12 21.792 12C23.456 12 24.8646 12.5438 26.0166 13.6318C27.1045 14.7197 27.6483 16.096 27.6484 17.7598C27.6484 19.4238 27.1046 20.8007 26.0166 21.8887C24.8646 23.0406 23.456 23.6162 21.792 23.6162ZM6.7207 23.6162C5.3127 23.6162 4.12797 23.1685 3.16797 22.2725C2.14399 21.4405 1.37625 20.3518 0.864258 19.0078C0.288353 17.6639 0 16.1917 0 14.5918C4.57764e-05 13.2479 0.223921 11.7756 0.671875 10.1758C1.05589 8.63989 1.72854 7.13596 2.68848 5.66406C3.64843 4.25619 4.92846 3.04053 6.52832 2.0166C8.06429 0.992622 9.98415 0.320007 12.2881 0V5.66406C10.2403 6.04805 8.64024 6.91201 7.48828 8.25586C6.53799 9.41732 5.98182 10.71 5.81543 12.1328C6.20395 12.0461 6.50564 12 6.7207 12C8.38444 12.0001 9.79247 12.544 10.9443 13.6318C12.0322 14.7197 12.5761 16.096 12.5762 17.7598C12.5762 19.4238 12.0323 20.8007 10.9443 21.8887C9.79247 23.0404 8.38441 23.6161 6.7207 23.6162Z"
        fill="#BE1E2D"
      />
    </svg>
  );
}

function LargeCloseQuote({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="237"
      height="203"
      viewBox="0 0 237 203"
      fill="none"
      className={className}
    >
      <path
        d="M50.5938 1C62.5177 1 72.5447 4.79399 80.6748 12.3818C89.3469 19.4279 95.8514 28.6423 100.188 40.0244C105.066 51.4066 107.505 63.8727 107.505 77.4229C107.505 88.805 105.608 101.271 101.813 114.821C98.5614 127.829 92.8703 140.566 84.7402 153.032C76.6101 164.956 65.7699 175.255 52.2197 183.927C39.2116 192.599 22.9516 198.29 3.43945 201V153.032C20.7835 149.78 34.3338 142.463 44.0898 131.081C52.1339 121.249 56.857 110.312 58.2686 98.2695C54.9746 99.0051 52.4165 99.374 50.5938 99.374C36.5015 99.374 24.5774 94.7668 14.8213 85.5527C5.60722 76.3387 1.00005 64.6858 1 50.5938C1 36.5016 5.60714 24.8479 14.8213 15.6338C24.5774 5.87784 36.5016 1.00001 50.5938 1ZM178.236 1C190.16 1 200.188 4.79381 208.318 12.3818C216.99 19.4279 223.495 28.6423 227.831 40.0244C232.709 51.4065 235.147 63.8728 235.147 77.4229C235.147 88.805 233.251 101.271 229.457 114.821C226.205 127.829 220.514 140.566 212.384 153.032C204.254 164.956 193.413 175.255 179.863 183.927C166.855 192.599 150.594 198.29 131.082 201V153.032C148.426 149.78 161.976 142.463 171.732 131.081C179.777 121.249 184.501 110.312 185.912 98.2695C182.618 99.0052 180.059 99.374 178.236 99.374C164.144 99.3739 152.22 94.7667 142.464 85.5527C133.25 76.3387 128.643 64.6857 128.643 50.5938C128.643 36.5016 133.25 24.8479 142.464 15.6338C152.22 5.87779 164.144 1.00011 178.236 1Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="3"
      />
    </svg>
  );
}

/* ─── Main Section ─── */
export default function Reviews() {
  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="px-4 md:px-20 max-w-[1350px] mx-auto">
        {/* ── Heading ── */}
        <div className="text-center mb-4 relative flex justify-center items-center">
          {/* Decorative open quote */}
          <LargeOpenQuote className="absolute left-1/2 -translate-x-[160px] sm:-translate-x-[240px] md:-translate-x-[370px] -top-2 md:-top-4 w-[28px] h-[24px] md:w-[40px] md:h-[34px] opacity-90" />

          <h2 className="text-white text-[36px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] uppercase tracking-tight inline-block relative z-10">
            <span className="text-white">What </span>
            <span className="text-[#BE1E2D]">Pet People Say</span>
          </h2>

          {/* Decorative close quote */}
          {/* To move this quote further right, just increase the translate-x values below (e.g. change 280px to 320px) */}
          <LargeCloseQuote className="absolute right-1/2 translate-x-[160px] sm:translate-x-[240px] md:translate-x-[520px] -top-8 md:-top-5 w-[160px] h-[137px] md:w-[237px] md:h-[203px] z-0 select-none pointer-events-none" />
        </div>

        {/* ── Subtitle ── */}
        <p
          className="text-white/40 text-[14px] md:text-[16px] text-center max-w-lg mx-auto mb-12 md:mb-16 leading-relaxed"
          style={{ fontFamily: 'var(--font-opensans)' }}
        >
          Real stories from pet parents who trust PetGo to keep their companions
          happy, healthy, and safe—every single day.
        </p>

        {/* ── Scrollable Review Cards ── */}
        <Carousel
          opts={{
            align: 'start',
            loop: false,
            dragFree: true,
          }}
          className="w-full select-none"
        >
          <CarouselContent className="-ml-8">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-8 basis-auto">
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <CarouselPrevious className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 -left-16 h-14 w-14 [&_svg]:size-8" /> */}
          {/* <CarouselNext className="hidden md:flex z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:-translate-y-1/2 text-white border-white/20 bg-white/10 hover:bg-[#BE1E2D] hover:border-[#BE1E2D] hover:text-white disabled:opacity-50 -right-16 h-14 w-14 [&_svg]:size-8" /> */}

          {/* Mobile buttons */}
          {/* <div className="flex md:hidden items-center justify-center gap-6 mt-8">
            <CarouselPrevious className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white disabled:opacity-50 h-14 w-14 [&_svg]:size-8" />
            <CarouselNext className="static translate-y-0 z-50 cursor-pointer active:scale-95 active:not-aria-[haspopup]:translate-y-0 text-white border-white/20 bg-white/10 hover:bg-[#BE1E2D] hover:border-[#BE1E2D] hover:text-white disabled:opacity-50 h-14 w-14 [&_svg]:size-8" />
          </div> */}
        </Carousel>
      </div>
    </section>
  );
}
