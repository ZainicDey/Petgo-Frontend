'use client';

import React from 'react';
import Image from 'next/image';

export interface ClinicData {
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

interface ClinicCardProps {
  clinic: ClinicData;
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1A1A1D] border border-[#2a2a2d] transition-all duration-300 hover:border-[#F7941D]/40 hover:shadow-[0_0_30px_rgba(247,148,29,0.08)]">
      {/* Image Section */}
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={clinic.image}
          alt={clinic.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7941D" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="text-[#F7941D] text-sm font-semibold">{clinic.average_rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Clinic Name */}
        <h3 className="text-white text-[16px] font-semibold leading-tight line-clamp-1">
          {clinic.name}
        </h3>

        {/* Tags (Services) */}
        <div className="flex flex-wrap gap-1.5">
          {clinic.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="text-[11px] text-gray-300 bg-[#2a2a2d] rounded-full px-2.5 py-0.5 border border-[#3a3a3d]"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-gray-400 text-[13px]">
          <svg
            className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#F7941D]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="line-clamp-1">
            {clinic.street}, {clinic.area}, {clinic.city}
          </span>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-2 text-gray-400 text-[13px]">
          <svg
            className="w-3.5 h-3.5 shrink-0 text-[#F7941D]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Open until 6:00 PM</span>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              clinic.status === 'Open'
                ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
                : 'text-red-400 bg-red-400/10 border border-red-400/30'
            }`}
          >
            {clinic.status === 'Open' ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* Book Appointment Button */}
        <button
          className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[14px] font-medium btn-gradient transition-all duration-300 hover:brightness-110 hover:shadow-[0_4px_15px_rgba(247,148,29,0.3)] active:scale-[0.98] cursor-pointer"
          id={`book-appointment-${clinic.id}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Book an Appointment
        </button>
      </div>
    </div>
  );
}
