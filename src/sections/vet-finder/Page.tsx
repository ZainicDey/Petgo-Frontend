'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import ClinicList from './ClinicList';
import FilterModal, { FilterState } from './FilterModal';
import LoadMore from './LoadMore';
import { ClinicData } from './ClinicCard';
import rectangle from '@/assets/images/Vet Rectangle.png';
import Button from '@/components/Buttton';
/* ── Mock Data ─────────────────────────────────────────────── */
const CLINIC_IMAGES = [
  '/vet-hospital-1.png',
  '/vet-doctor-1.png',
  '/vet-hospital-2.png',
  '/vet-pets-group.png',
];

const MOCK_CLINICS: ClinicData[] = [
  {
    id: 1,
    image: CLINIC_IMAGES[0],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801711111111',
    average_rating: 4.8,
    tags: ['24/7 Emergency', 'Modern Surgery'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 2,
    image: CLINIC_IMAGES[1],
    name: 'Dr. Nabil Chowdhury',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801722222222',
    average_rating: 4.8,
    tags: ['Exotic Pets'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 3,
    image: CLINIC_IMAGES[2],
    name: 'Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801733333333',
    average_rating: 4.8,
    tags: ['Affordable Care'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 4,
    image: CLINIC_IMAGES[3],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801744444444',
    average_rating: 4.8,
    tags: ['Highly Rated'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 5,
    image: CLINIC_IMAGES[2],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801755555555',
    average_rating: 4.8,
    tags: ['In-house Pharmacy'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 6,
    image: CLINIC_IMAGES[1],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801766666666',
    average_rating: 4.8,
    tags: ['Top in Chittagong'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 7,
    image: CLINIC_IMAGES[0],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801777777777',
    average_rating: 4.8,
    tags: ['Sylhet Division'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 8,
    image: CLINIC_IMAGES[1],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801788888888',
    average_rating: 4.8,
    tags: ['Luxury Pet Boarding', '24/7 Emergency'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 9,
    image: CLINIC_IMAGES[3],
    name: 'Dhaka Veterinary Hospital',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801799999999',
    average_rating: 4.8,
    tags: ['Friendly Staff'],
    services: ['Emergency Care', 'Surgery', 'Dental Care'],
    status: 'Open',
  },
];

/* ── Area Options ─────────────────────────────────────────── */
const AREAS = [
  'All Areas',
  'Dhanmondi',
  'Gulshan',
  'Banani',
  'Uttara',
  'Mirpur',
  'Bashundhara',
  'Chittagong',
  'Sylhet',
];

const ITEMS_PER_PAGE = 9;

export default function VetFinderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    minRating: 0,
    statusOpen: null,
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  /* ── Filtering Logic ─────────────────────────────────────── */
  const filteredClinics = useMemo(() => {
    return MOCK_CLINICS.filter((clinic) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          clinic.name.toLowerCase().includes(q) ||
          clinic.services.some((s) => s.toLowerCase().includes(q)) ||
          clinic.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Area filter
      if (selectedArea !== 'All Areas' && clinic.area !== selectedArea) {
        return false;
      }

      // Services filter
      if (filters.services.length > 0) {
        const hasService = filters.services.some((s) =>
          clinic.services.includes(s)
        );
        if (!hasService) return false;
      }

      // Rating filter
      if (filters.minRating > 0 && clinic.average_rating < filters.minRating) {
        return false;
      }

      // Status filter
      if (filters.statusOpen !== null) {
        const isOpen = clinic.status === 'Open';
        if (isOpen !== filters.statusOpen) return false;
      }

      return true;
    });
  }, [searchQuery, selectedArea, filters]);

  const visibleClinics = filteredClinics.slice(0, visibleCount);
  const hasMore = visibleCount < filteredClinics.length;

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 600);
  }, []);

  const handleSearch = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Background Rectangle ── */}
      <div className="absolute -top-10 inset-x-0 z-0 flex justify-center pointer-events-none mt-9">
        <Image src={rectangle} alt="" className="h-full w-full" />
      </div>

      {/* ── Hero Header ── */}
      <div className="relative text-center pt-30 pb-8 px-4">
        {/* Subtle radial background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,0.06)_0%,transparent_70%)] pointer-events-none" />

        <h1 className="relative text-4xl md:text-5xl lg:text-[58px] font-bold text-[#F7941D] mb-3">
          VET FINDER
        </h1>
        <p className="relative text-white text-sm md:text-base max-w-md mx-auto">
          Find your vet right from your fingertips.
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12">
        <div className="flex flex-col mt-14 sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl mx-auto sm:translate-x-10">
          {/* Main Search Input & Area Select Container */}
          <div className="flex-1 flex flex-col sm:flex-row items-center min-h-[50px] rounded-[18px] bg-[rgba(255,240,222,0.10)] border border-[rgba(255,240,222,0.10)] pl-5 pr-3 py-2 sm:py-0">
            <input
              type="text"
              placeholder="Search by service or specialty"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 w-full sm:w-auto h-full min-h-[40px] bg-transparent text-white text-medium placeholder-[#8a8a8a] focus:outline-none"
              id="search-vet-input"
            />

            {/* Area Select */}
            <div className="relative flex items-center mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto">
              <select
                value={selectedArea}
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="h-[36px] w-full sm:w-auto px-4 pr-10 rounded-[10px] bg-transparent border border-[#555] text-gray-300 text-sm appearance-none cursor-pointer focus:outline-none hover:border-gray-400 transition-colors"
                id="area-select"
              >
                {AREAS.map((area) => (
                  <option key={area} value={area} className="bg-[#1A1A1D]">
                    {area}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            label="Filters"
            onClick={() => setFilterOpen(true)}
            className="w-full sm:w-auto h-[50px] px-6 rounded-[18px] text-[16px] font-semibold border-[#2a2a2d] text-gray-300 hover:text-white hover:border-[#F7941D]/40 transition-all duration-200"
            icon={
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            }
          />
        </div>
      </div>

      {/* ── Results Section ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        {/* Clinic List */}
        <ClinicList
          clinics={visibleClinics}
          totalCount={filteredClinics.length}
        />

        {/* Load More */}
        <LoadMore
          onClick={handleLoadMore}
          isLoading={isLoadingMore}
          hasMore={hasMore}
        />
      </div>

      {/* ── Filter Modal ── */}
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onFilter={(f) => {
          setFilters(f);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
      />
    </section>
  );
}
