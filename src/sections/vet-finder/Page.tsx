'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import Image from 'next/image';
import ClinicList from './ClinicList';
import FilterModal, { FilterState } from './FilterModal';
import LoadMore from './LoadMore';
import { ClinicData } from './ClinicCard';
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
  'Select Area',
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
  const [selectedArea, setSelectedArea] = useState('Select Area');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: null,
    services: [],
    species: [],
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const areaDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        areaDropdownRef.current &&
        !areaDropdownRef.current.contains(event.target as Node)
      ) {
        setAreaDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Filtering Logic ─────────────────────────────────────── */
  const filteredClinics = useMemo(() => {
    let result = MOCK_CLINICS.filter((clinic) => {
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
      if (selectedArea !== 'Select Area' && clinic.area !== selectedArea) {
        return false;
      }

      // Services filter
      if (filters.services.length > 0) {
        const hasService = filters.services.some((s) =>
          clinic.services.includes(s)
        );
        if (!hasService) return false;
      }

      // Species filter (Mock: checking tags for now as there's no explicit species data)
      if (filters.species.length > 0) {
        // If a clinic has no specific species tags, we might exclude it or include it.
        // For mock purposes, let's say it matches if tags contain the species, or if we just want to show something,
        // we'll do a simple includes check.
        const hasSpecies = filters.species.some((s) =>
          clinic.tags.some((t) => t.toLowerCase().includes(s.toLowerCase()))
        );
        if (!hasSpecies) return false;
      }

      return true;
    });

    if (filters.sortBy === 'Rating') {
      result = [...result].sort((a, b) => b.average_rating - a.average_rating);
    }
    // We can add sorting for Distance and Most Reviewed when data supports it

    return result;
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
      <div className="absolute -top-5 inset-x-0 z-0 flex justify-center pointer-events-none mt-9">
        <div
          className="w-full h-[750px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(136, 136, 136, 0.00) 0%, rgba(104, 104, 104, 0.25) 50%, rgba(136, 136, 136, 0.00) 100%)',
          }}
        />
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
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12 relative z-30">
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
            <div
              ref={areaDropdownRef}
              className="relative flex items-center mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto"
            >
              <button
                onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
                className="h-[36px] w-full sm:w-[130px] px-4 pr-4 rounded-[9px] border border-[rgba(255,240,222,0.10)] bg-[rgba(255,240,222,0.05)] text-white text-left flex items-center justify-between cursor-pointer focus:outline-none transition-colors select-none"
                style={{
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '20px',
                }}
                id="area-select"
              >
                <span>{selectedArea}</span>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
                  areaDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#FFF0DE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {areaDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 z-50 w-full bg-[#1A1A1D]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ fontFamily: '"Open Sans", sans-serif' }}
                >
                  {AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        setSelectedArea(area);
                        setVisibleCount(ITEMS_PER_PAGE);
                        setAreaDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/10 text-white text-[14px] font-normal leading-[20px] transition-colors"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              )}
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
        currentFilters={filters}
        onFilter={(f) => {
          setFilters(f);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
      />
    </section>
  );
}
