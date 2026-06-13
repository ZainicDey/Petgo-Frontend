'use client';

import React, { useState, useEffect } from 'react';

export interface FilterState {
  sortBy: string | null;
  services: string[];
  species: string[];
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterState) => void;
  currentFilters?: FilterState;
}

const SORT_OPTIONS = ['Distance', 'Rating', 'Most Reviewed'];

const SERVICES_OPTIONS = [
  'Emergency Care',
  'Surgery',
  'Dental Care',
  'Vaccinations',
  'Grooming',
  'Boarding',
];

const SPECIES_OPTIONS = [
  'Dogs',
  'Cats',
  'Birds',
  'Exotic Pets',
  'Farm Animals',
];

export default function FilterModal({
  isOpen,
  onClose,
  onFilter,
  currentFilters,
}: FilterModalProps) {
  const [sortBy, setSortBy] = useState<string | null>(
    currentFilters?.sortBy || null
  );
  const [selectedServices, setSelectedServices] = useState<string[]>(
    currentFilters?.services || []
  );
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(
    currentFilters?.species || []
  );

  // Update local state if currentFilters change (e.g. when reopening)
  useEffect(() => {
    if (currentFilters) {
      setSortBy(currentFilters.sortBy);
      setSelectedServices(currentFilters.services);
      setSelectedSpecies(currentFilters.species);
    }
  }, [currentFilters, isOpen]);

  // Prevent background scrolling when modal is open
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

  const handleApply = (
    newSortBy: string | null,
    newServices: string[],
    newSpecies: string[]
  ) => {
    onFilter({
      sortBy: newSortBy,
      services: newServices,
      species: newSpecies,
    });
  };

  const toggleService = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newServices);
    handleApply(sortBy, newServices, selectedSpecies);
  };

  const toggleSpecies = (species: string) => {
    const newSpecies = selectedSpecies.includes(species)
      ? selectedSpecies.filter((s) => s !== species)
      : [...selectedSpecies, species];
    setSelectedSpecies(newSpecies);
    handleApply(sortBy, selectedServices, newSpecies);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    handleApply(sort, selectedServices, selectedSpecies);
  };

  const handleClearFilters = () => {
    setSortBy(null);
    setSelectedServices([]);
    setSelectedSpecies([]);
    handleApply(null, [], []);
    // Optional: close modal on clear? Usually no, but we keep it open so user sees it cleared.
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl w-full max-w-[320px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 font-[family-name:var(--font-opensans)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2a2a2d]">
            <h3 className="text-white text-lg font-normal">Filters</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer rounded-full hover:bg-[#2a2a2d]"
              aria-label="Close filters"
            >
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
            </button>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h4 className="text-[#F7941D] text-base font-medium mb-3">
              Sort By
            </h4>
            <div className="flex flex-col gap-3">
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleSortChange(option)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      sortBy === option
                        ? 'border-[#333] bg-transparent'
                        : 'border-[#444] group-hover:border-[#F7941D]/60'
                    }`}
                  >
                    {sortBy === option && (
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                    )}
                  </div>
                  <span className="text-gray-300 text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h4 className="text-[#F7941D] text-base font-medium mb-3">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {SERVICES_OPTIONS.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => toggleService(service)}
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
                      selectedServices.includes(service)
                        ? 'bg-[#F7941D] border-[#F7941D]'
                        : 'border-[#444] group-hover:border-[#F7941D]/60'
                    }`}
                  >
                    {selectedServices.includes(service) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-300 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Species */}
          <div className="mb-8">
            <h4 className="text-[#F7941D] text-base font-medium mb-3">
              Species
            </h4>
            <div className="flex flex-col gap-3">
              {SPECIES_OPTIONS.map((species) => (
                <div
                  key={species}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => toggleSpecies(species)}
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
                      selectedSpecies.includes(species)
                        ? 'bg-[#F7941D] border-[#F7941D]'
                        : 'border-[#444] group-hover:border-[#F7941D]/60'
                    }`}
                  >
                    {selectedSpecies.includes(species) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-300 text-sm">{species}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters}
            className="w-full py-3 rounded-xl border border-red-900/60 text-red-600 text-sm font-medium hover:bg-red-900/10 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
