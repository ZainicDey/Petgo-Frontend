'use client';

import React from 'react';

interface ListingLoadMoreProps {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export default function ListingLoadMore({ onClick, isLoading, hasMore }: ListingLoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center pt-6 pb-2">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="group relative px-8 py-3 rounded-full border border-[#3a3a3d] text-white text-[15px] font-medium bg-transparent hover:border-[#F7941D]/60 hover:bg-[#F7941D]/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        id="load-more-listings"
      >
        <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : ''}`}>
          Load More
        </span>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-[#F7941D] rounded-full animate-spin" />
          </div>
        )}
      </button>
    </div>
  );
}
