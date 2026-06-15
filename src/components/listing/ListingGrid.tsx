'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import ListingCard, { ListingData } from './ListingCard';

interface ListingGridProps {
  items: ListingData[];
  totalCount: number;
  /** Label shown next to the total count, e.g. "Clinics Found" or "Foster Homes Found" */
  resultLabel?: string;
  /** CTA button text passed through to each card */
  ctaLabel?: string;
  /** CTA icon passed through to each card */
  ctaIcon?: React.ReactNode;
  /** Callback when a card's CTA is clicked */
  onCtaClick?: (item: ListingData) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export default function ListingGrid({
  items,
  totalCount,
  resultLabel = 'Clinics Found',
  ctaLabel,
  ctaIcon,
  onCtaClick,
}: ListingGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* Empty state */}
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between my-14">
        <p className="text-white/50 font-[family-name:var(--font-opensans)] text-[16px] font-normal leading-[22px]">
          Search Results:{' '}
          <span className="text-white font-[Gabarito] text-[18px] font-medium leading-[22px] ml-1">
            {totalCount} {resultLabel}
          </span>
        </p>
      </div>

      {/* Animated Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <ListingCard
              item={item}
              ctaLabel={ctaLabel}
              ctaIcon={ctaIcon}
              onCtaClick={onCtaClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
