'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import belt1 from '@/assets/images/belt-1.png';
import belt2 from '@/assets/images/belt-2.png';
import belt3 from '@/assets/images/belt-3.png';

const campaigns = [
  {
    id: 1,
    name: 'Belt of Hope Campaign',
    images: [belt1, belt2, belt3],
  },
  {
    id: 2,
    name: 'Paws for Love Campaign',
    images: [],
  },
  {
    id: 3,
    name: 'FurEver Friends Campaign',
    images: [],
  },
  {
    id: 4,
    name: 'Whiskers & Wags Campaign',
    images: [],
  },
  {
    id: 5,
    name: 'Paw Promise Campaign',
    images: [],
  },
];

const CameraIcon = ({ selected }: { selected: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke={selected ? '#F7941D' : '#ffffff'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export default function Campaign() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 496; // 480px image width + 16px gap (gap-4)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Smooth 1.5x multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto py-4 px-4 sm:px-6 lg:px-8 my-8 md:my-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-12 sm:mb-16 text-[#F7941D] uppercase tracking-wide">
        IMAGE GALLERY
      </h2>

      <div className="flex flex-col md:flex-row gap-12 p-3 md:py-12 rounded-[24px] border border-white/15 bg-campaign-radial">
        {/* Sidebar */}
        <div className="flex flex-col gap-3.5 w-full md:w-[345px] shrink-0">
          {campaigns.map((campaign, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={campaign.id}
                onClick={() => setSelectedIndex(index)}
                className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-[14px] transition-all duration-300 ${
                  isSelected
                    ? 'bg-white text-black shadow-md'
                    : 'bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                <CameraIcon selected={isSelected} />
                <span
                  className={`font-[family-name:var(--font-inter)] text-[20px] font-medium leading-normal text-left whitespace-nowrap ${isSelected ? 'text-black' : ''}`}
                >
                  {campaign.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Wrapper */}
        <div className="flex-1 relative min-w-0 group">
          {campaigns[selectedIndex].images.length > 1 && (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-[#F7941D] hover:text-white text-white/80 p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label="Scroll left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-[#F7941D] hover:text-white text-white/80 p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label="Scroll right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Gallery Scroll Container */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-2.5 overflow-x-auto scrollbar-hide pb-4 md:pb-0 min-w-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {campaigns[selectedIndex].images.length > 0 ? (
              campaigns[selectedIndex].images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-[480px] h-[320px] rounded-[16px] overflow-hidden shrink-0 select-none"
                >
                  <Image
                    src={img}
                    alt={`Campaign image ${i + 1}`}
                    fill
                    draggable={false}
                    className="object-cover pointer-events-none"
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[320px] flex items-center justify-center rounded-[16px] border border-white/10 text-white/40 font-medium">
                More images coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
