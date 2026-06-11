'use client';

import React, { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterState) => void;
}

export interface FilterState {
  services: string[];
  minRating: number;
  statusOpen: boolean | null;
}

const AVAILABLE_SERVICES = [
  'Dental Care',
  'Vaccination',
  'Health Checkup',
  'Pet Grooming',
  'X-Ray & Imaging',
  'Blood Tests & Labs',
  'Pet Boarding',
  'Orthopedics',
  'Modern Surgery',
];

export default function FilterModal({ isOpen, onClose, onFilter }: FilterModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

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

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleApply = () => {
    onFilter({
      services: selectedServices,
      minRating,
      statusOpen: statusFilter,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedServices([]);
    setMinRating(0);
    setStatusFilter(null);
    onFilter({ services: [], minRating: 0, statusOpen: null });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1A1A1D] border border-[#2a2a2d] rounded-2xl w-full max-w-[400px] max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2a2a2d] sticky top-0 bg-[#1A1A1D] z-10">
          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-[#F7941D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer rounded-full hover:bg-[#2a2a2d]"
            aria-label="Close filters"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-6">
          {/* Services Filter */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Services</h4>
            <div className="flex flex-col gap-2">
              {AVAILABLE_SERVICES.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-3 cursor-pointer group/item"
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedServices.includes(service)
                        ? 'bg-[#F7941D] border-[#F7941D]'
                        : 'border-gray-500 group-hover/item:border-[#F7941D]/60'
                    }`}
                    onClick={() => toggleService(service)}
                  >
                    {selectedServices.includes(service) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-gray-300 text-sm group-hover/item:text-white transition-colors"
                    onClick={() => toggleService(service)}
                  >
                    {service}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Minimum Rating</h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setMinRating(star === minRating ? 0 : star)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= minRating ? '#F7941D' : 'none'}
                    stroke={star <= minRating ? '#F7941D' : '#666'}
                    strokeWidth="2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </button>
              ))}
              {minRating > 0 && (
                <span className="text-[#F7941D] text-sm ml-2">{minRating}+</span>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Availability</h4>
            <div className="flex gap-2">
              {[
                { label: 'All', value: null },
                { label: 'Open Now', value: true },
                { label: 'Closed', value: false },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    statusFilter === option.value
                      ? 'bg-[#F7941D] text-white'
                      : 'bg-[#2a2a2d] text-gray-300 hover:bg-[#3a3a3d]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 border-t border-[#2a2a2d] flex gap-3 mt-auto sticky bottom-0 bg-[#1A1A1D]">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl text-gray-300 text-sm font-medium border border-[#3a3a3d] hover:bg-[#2a2a2d] transition-all duration-200 cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium btn-gradient hover:brightness-110 transition-all duration-200 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
