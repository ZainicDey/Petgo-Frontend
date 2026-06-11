'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import ClinicCard, { ClinicData } from './ClinicCard';

interface ClinicListProps {
  clinics: ClinicData[];
  totalCount: number;
}

// 1. Define the animation rules
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // This is your 60ms delay between cards
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
      ease: "easeOut"
    }
  },
};

export default function ClinicList({ clinics, totalCount }: ClinicListProps) {
  if (clinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        {/* Empty state SVG & Text */}
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-300 text-sm">
          Search Results: <span className="text-white font-semibold">{totalCount} Clinics Found</span>
        </p>
      </div>

      {/* 2. Apply Framer Motion to the Grid and Items */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {clinics.map((clinic) => (
          <motion.div key={clinic.id} variants={cardVariants}>
            <ClinicCard clinic={clinic} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}