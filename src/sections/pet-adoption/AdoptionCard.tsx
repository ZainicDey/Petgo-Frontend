'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface AdoptionData {
  id: number;
  image: string;
  name: string;
  breed: string;
  age: string;
  gender: string;
  description: string;
  location: string;
  postedDate: string;
  health: string;
}

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z" stroke="#F7941D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.6663 8.33335C16.6663 12.4942 12.0505 16.8275 10.5005 18.1659C10.3561 18.2744 10.1803 18.3331 9.99967 18.3331C9.81901 18.3331 9.64324 18.2744 9.49884 18.1659C7.94884 16.8275 3.33301 12.4942 3.33301 8.33335C3.33301 6.56524 4.03539 4.86955 5.28563 3.61931C6.53587 2.36907 8.23156 1.66669 9.99967 1.66669C11.7678 1.66669 13.4635 2.36907 14.7137 3.61931C15.964 4.86955 16.6663 6.56524 16.6663 8.33335Z" stroke="#F7941D" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10.8333C11.3807 10.8333 12.5 9.71402 12.5 8.33331C12.5 6.9526 11.3807 5.83331 10 5.83331C8.61929 5.83331 7.5 6.9526 7.5 8.33331C7.5 9.71402 8.61929 10.8333 10 10.8333Z" stroke="#F7941D" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function AdoptionCard({ item, onContactDonor }: { item: AdoptionData; onContactDonor?: (item: AdoptionData) => void }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] transition-all duration-300 hover:border-[#F7941D]/40 hover:shadow-[0_0_30px_rgba(247,148,29,0.08)]">
      {/* Image */}
      <Link href={`/pet-adoption/${item.id}`} className="relative w-full h-[220px] overflow-hidden block">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/pet-adoption/${item.id}`}>
            <h3 className="text-[#FFF0DE] font-[Gabarito] text-[24px] font-[500] leading-[30px] not-italic hover:text-[#F7941D] transition-colors">
              {item.name}
            </h3>
          </Link>
          <button className="text-orange-400 hover:scale-110 transition-transform">
            <HeartIcon />
          </button>
        </div>
        
        <div 
          className="text-[#FFF] flex items-center gap-2"
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px'
          }}
        >
          <span>{item.breed}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="white"/>
          </svg>
          <span>{item.age}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="white"/>
          </svg>
          <span>{item.gender}</span>
        </div>
        
        <p 
          className="mt-3 mb-4 line-clamp-3"
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '22px'
          }}
        >
          {item.description}
        </p>

        <div 
          className="flex items-center gap-2 mb-2"
          style={{
            color: '#FFF',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '22px'
          }}
        >
          <LocationIcon />
          <span>{item.location}</span>
        </div>
        
        <div 
          className="flex items-center gap-2 mb-4"
          style={{
            color: '#FFF',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '22px'
          }}
        >
          <CalendarIcon />
          <span>{item.postedDate}</span>
        </div>

        <p 
          className="mb-5 mt-auto"
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '22px'
          }}
        >
          Health: {item.health}
        </p>

        <button 
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[12px] bg-[#F7941D] text-[#1D1D1F] transition-colors duration-300 hover:bg-[#d87c12] active:scale-[0.98] cursor-pointer"
          style={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '20px'
          }}
          onClick={() => onContactDonor?.(item)}
        >
          <PhoneIcon />
          Contact Donor
        </button>
      </div>
    </div>
  );
}
