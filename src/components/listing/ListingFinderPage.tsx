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
import BookingModal from './BookingModal';
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
  /** Callback when a card body is clicked (e.g., navigate to detail page) */
  onCardClick?: (item: ListingData) => void;
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
  onCardClick,
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

  // States for the Booking Modal
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListingData | null>(null);

  const handleCtaClick = useCallback((item: ListingData) => {
    setSelectedItem(item);
    setBookingOpen(true);
  }, []);

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
      <div className="relative text-center pt-20 pb-8 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,148,29,0.06)_0%,transparent_70%)] pointer-events-none" />

        <h1 className="relative text-4xl md:text-5xl lg:text-[58px] font-bold text-[#F7941D] mb-3">
          {title}
        </h1>
        <p className="relative text-white font-sans text-sm md:text-base max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-12 relative z-45">
        <div className="flex flex-col mt-8 sm:flex-row items-stretch sm:items-center gap-4 max-w-[850px] mx-auto sm:translate-x-10">
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

          {/* Search Button */}
          <Button
            variant="solid"
            label="Search"
            onClick={handleSearch}
            className="w-full sm:w-auto h-[50px] px-6 rounded-[18px] text-[16px] font-semibold"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8.95776 2.15219C10.7473 2.10324 12.4878 2.74161 13.821 3.93637C15.1541 5.13105 15.9789 6.79104 16.1257 8.57504C16.2725 10.3593 15.7302 12.1326 14.6101 13.5291L14.3289 13.8797L14.6482 14.1971L17.7351 17.2596C17.793 17.3213 17.8258 17.4024 17.8259 17.4872C17.8259 17.5727 17.7921 17.6547 17.7332 17.7166C17.7027 17.7466 17.6671 17.7715 17.6277 17.7879C17.5872 17.8047 17.5436 17.8133 17.4998 17.8133C17.4559 17.8133 17.4123 17.8048 17.3718 17.7879C17.3313 17.771 17.2944 17.7459 17.2634 17.7147L13.8787 14.3299L13.5291 14.6102C12.1325 15.7303 10.3592 16.2726 8.57495 16.1258C6.79095 15.979 5.13096 15.1542 3.93628 13.8211C2.74152 12.4879 2.10315 10.7474 2.1521 8.95786C2.20107 7.16828 2.93308 5.46496 4.19897 4.19907C5.46487 2.93317 7.16819 2.20116 8.95776 2.15219ZM11.5906 3.31528C10.4334 2.83597 9.15982 2.71066 7.9314 2.95493C6.70285 3.1993 5.57396 3.80259 4.68823 4.68832C3.8025 5.57406 3.19921 6.70294 2.95483 7.93149C2.71056 9.15991 2.83588 10.4335 3.31519 11.5907C3.79455 12.7478 4.60675 13.7366 5.64819 14.4325C6.68969 15.1284 7.91416 15.4998 9.16675 15.4998C10.8464 15.4998 12.4576 14.833 13.6453 13.6454C14.833 12.4577 15.4997 10.8465 15.4998 9.16684C15.4998 7.91425 15.1283 6.68978 14.4324 5.64828C13.7365 4.60684 12.7477 3.79464 11.5906 3.31528Z" fill="black" stroke="#FFF0DE"/>
              </svg>
            }
          />

          {/* Filter Button */}
          <Button
            variant="outline"
            label="Filters"
            onClick={() => setFilterOpen((prev) => !prev)}
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

      {/* ── Inline Filter Panel ── */}
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

      {/* ── Results Section ── */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        <ListingGrid
          items={visibleItems}
          totalCount={filteredItems.length}
          resultLabel={resultLabel}
          ctaLabel={ctaLabel}
          ctaIcon={ctaIcon}
          onCtaClick={handleCtaClick}
          onCardClick={onCardClick}
        />

        <ListingLoadMore
          onClick={handleLoadMore}
          isLoading={isLoadingMore}
          hasMore={hasMore}
        />
      </div>


      {/* ── Booking Modal ── */}
      {selectedItem && (
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          item={selectedItem}
        />
      )}
    </section>
  );
}
