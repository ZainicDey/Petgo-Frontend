'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import ListingGrid from './ListingGrid';
import ListingFilterModal, {
  ListingFilterState,
  FilterSection,
} from './ListingFilterModal';
import ListingLoadMore from './ListingLoadMore';
import { ListingData } from './ListingCard';
import Button from '@/components/Buttton';

/* ── Props ──────────────────────────────────────────────────── */

export interface ListingFinderPageProps {
  /** Hero title, e.g. "VET FINDER" or "FOSTER HOUSE FINDER" */
  title: string;
  /** Subtitle shown below the title */
  subtitle?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Area dropdown options (first item is the default/placeholder) */
  areas?: string[];
  /** Items to display */
  items: ListingData[];
  /** Label for result count, e.g. "Clinics Found" */
  resultLabel?: string;
  /** CTA button text on each card */
  ctaLabel?: string;
  /** CTA icon on each card */
  ctaIcon?: React.ReactNode;
  /** Sort options for the filter modal */
  sortOptions?: string[];
  /** Filter sections for the filter modal */
  filterSections?: FilterSection[];
}

/* ── Default area options ───────────────────────────────────── */

const DEFAULT_AREAS = [
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

/* ── Component ──────────────────────────────────────────────── */

export default function ListingFinderPage({
  title,
  subtitle = 'Find your vet right from your fingertips.',
  searchPlaceholder = 'Search by service or specialty',
  areas = DEFAULT_AREAS,
  items,
  resultLabel = 'Clinics Found',
  ctaLabel,
  ctaIcon,
  sortOptions,
  filterSections,
}: ListingFinderPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState(areas[0] || 'Select Area');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ListingFilterState>({
    sortBy: null,
    selections: {},
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

  /* ── Filtering Logic ──────────────────────────────────────── */
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.services.some((s) => s.toLowerCase().includes(q)) ||
          item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }

      // Area filter
      if (selectedArea !== areas[0] && item.area !== selectedArea) {
        return false;
      }

      // Dynamic filter selections
      for (const [, selected] of Object.entries(filters.selections)) {
        if (selected.length > 0) {
          const hasMatch = selected.some(
            (s) =>
              item.services.includes(s) ||
              item.tags.some((t) =>
                t.toLowerCase().includes(s.toLowerCase())
              )
          );
          if (!hasMatch) return false;
        }
      }

      return true;
    });

    if (filters.sortBy === 'Rating') {
      result = [...result].sort(
        (a, b) => b.average_rating - a.average_rating
      );
    }

    return result;
  }, [searchQuery, selectedArea, filters, items, areas]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,0.06)_0%,transparent_70%)] pointer-events-none" />

        <h1 className="relative text-4xl md:text-5xl lg:text-[58px] font-bold text-[#F7941D] mb-3">
          {title}
        </h1>
        <p className="relative text-white text-sm md:text-base max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12 relative z-30">
        <div className="flex flex-col mt-14 sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl mx-auto sm:translate-x-10">
          {/* Main Search Input & Area Select Container */}
          <div className="flex-1 flex flex-col sm:flex-row items-center min-h-[50px] rounded-[18px] bg-[rgba(255,240,222,0.10)] border border-[rgba(255,240,222,0.10)] pl-5 pr-3 py-2 sm:py-0">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 w-full sm:w-auto h-full min-h-[40px] bg-transparent text-white text-medium placeholder-[#8a8a8a] focus:outline-none"
              id="search-listing-input"
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
                  {areas.map((area) => (
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
        <ListingGrid
          items={visibleItems}
          totalCount={filteredItems.length}
          resultLabel={resultLabel}
          ctaLabel={ctaLabel}
          ctaIcon={ctaIcon}
        />

        <ListingLoadMore
          onClick={handleLoadMore}
          isLoading={isLoadingMore}
          hasMore={hasMore}
        />
      </div>

      {/* ── Filter Modal ── */}
      <ListingFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        currentFilters={filters}
        onFilter={(f) => {
          setFilters(f);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
        sortOptions={sortOptions}
        filterSections={filterSections}
      />
    </section>
  );
}
