'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ── Types ──────────────────────────────────────────────────── */

export interface ListingFilterState {
  sortBy: string | null;
  /** Dynamic filter selections keyed by section label */
  selections: Record<string, string[]>;
}

export interface FilterSection {
  /** Display label, e.g. "Services" or "Amenities" */
  label: string;
  /** Available options within this section */
  options: string[];
}

interface ListingFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: ListingFilterState) => void;
  currentFilters?: ListingFilterState;
  sortOptions?: string[];
  filterSections?: FilterSection[];
}

/* ── Defaults ───────────────────────────────────────────────── */

const DEFAULT_SORT_OPTIONS = ['Distance', 'Rating', 'Most Reviewed'];

const DEFAULT_FILTER_SECTIONS: FilterSection[] = [
  {
    label: 'Services',
    options: [
      'Emergency Care',
      'Surgery',
      'Dental Care',
      'Vaccinations',
      'Grooming',
      'Boarding',
    ],
  },
  {
    label: 'Species',
    options: ['Dogs', 'Cats', 'Birds', 'Exotic Pets', 'Farm Animals'],
  },
];

/* ── Dropdown Component ─────────────────────────────────────── */

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 min-w-0 flex-1" ref={ref}>
      <span className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">
        {label}
      </span>
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`w-full h-[38px] px-3 pr-8 rounded-[10px] border text-left text-[13px] font-normal flex items-center cursor-pointer transition-all duration-150 select-none ${
            selected
              ? 'border-[#F7941D]/50 bg-[#F7941D]/10 text-[#F7941D]'
              : 'border-white/15 bg-white/5 text-white/70 hover:border-white/30'
          }`}
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          <span className="truncate">{selected || 'Any'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke={selected ? '#F7941D' : '#FFF0DE'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div
            className="absolute top-full left-0 mt-1 z-50 w-full min-w-[140px] bg-[#1A1A1D]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            {/* "Any" / clear option */}
            <button
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[13px] font-normal leading-[18px] transition-colors ${
                !selected
                  ? 'bg-[#F7941D]/15 text-[#F7941D]'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Any
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[13px] font-normal leading-[18px] transition-colors ${
                  selected === option
                    ? 'bg-[#F7941D]/15 text-[#F7941D]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export default function ListingFilterModal({
  isOpen,
  onClose,
  onFilter,
  currentFilters,
  sortOptions = DEFAULT_SORT_OPTIONS,
  filterSections = DEFAULT_FILTER_SECTIONS,
}: ListingFilterPanelProps) {
  const [sortBy, setSortBy] = useState<string | null>(
    currentFilters?.sortBy || null
  );
  const [selections, setSelections] = useState<Record<string, string[]>>(
    currentFilters?.selections || {}
  );

  // Sync local state when panel reopens
  useEffect(() => {
    if (currentFilters) {
      setSortBy(currentFilters.sortBy);
      setSelections(currentFilters.selections);
    }
  }, [currentFilters, isOpen]);

  const handleApply = (
    newSortBy: string | null,
    newSelections: Record<string, string[]>
  ) => {
    onFilter({ sortBy: newSortBy, selections: newSelections });
  };

  const handleSortChange = (sort: string | null) => {
    setSortBy(sort);
    handleApply(sort, selections);
  };

  const handleSectionChange = (sectionLabel: string, value: string | null) => {
    const newSelections = {
      ...selections,
      [sectionLabel]: value ? [value] : [],
    };
    setSelections(newSelections);
    handleApply(sortBy, newSelections);
  };

  if (!isOpen) return null;

  return (
    <div
      className="container mx-auto px-4 md:px-8 lg:px-16 relative z-30 -mt-6 mb-8 animate-in fade-in slide-in-from-top-3 duration-200"
      style={{ fontFamily: '"Open Sans", sans-serif' }}
    >
      <div className="bg-[#141416] border border-white/10 rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
            aria-label="Close filters"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-4 px-5 py-4">
          {/* Sort By dropdown */}
          <FilterDropdown
            label="Sort By"
            options={sortOptions}
            selected={sortBy}
            onSelect={handleSortChange}
          />

          {/* Dynamic filter section dropdowns */}
          {filterSections.map((section) => (
            <FilterDropdown
              key={section.label}
              label={section.label}
              options={section.options}
              selected={(selections[section.label] || [])[0] || null}
              onSelect={(value) => handleSectionChange(section.label, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
