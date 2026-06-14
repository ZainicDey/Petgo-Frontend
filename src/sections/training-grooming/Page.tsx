'use client';

import React from 'react';
import { ListingFinderPage } from '@/components/listing';
import type { ListingData, FilterSection } from '@/components/listing';
import { Scissors } from 'lucide-react';

/* ── Mock Images (reusing vet images for now) ──────────────── */
const TRAINING_IMAGES = [
  '/vet-hospital-1.png',
  '/vet-doctor-1.png',
  '/vet-hospital-2.png',
  '/vet-pets-group.png',
];

/* ── Mock Training & Grooming Centers ───────────────────────── */
const MOCK_TRAINING_CENTERS: ListingData[] = [
  {
    id: 1,
    image: TRAINING_IMAGES[0],
    name: 'Paws & Play Training',
    street: 'House 15, Road 7',
    area: 'Gulshan',
    city: 'Dhaka 1212',
    phone_number: '+8801712345678',
    average_rating: 4.8,
    tags: ['Dog', 'Cat', 'Grooming'],
    services: ['Dog', 'Cat', 'Grooming'],
    status: 'Open',
  },
  {
    id: 2,
    image: TRAINING_IMAGES[1],
    name: 'Elite Pet Grooming',
    street: 'House 22, Road 4',
    area: 'Banani',
    city: 'Dhaka 1213',
    phone_number: '+8801787654321',
    average_rating: 4.9,
    tags: ['Dog', 'Cat', 'Training'],
    services: ['Dog', 'Cat', 'Training'],
    status: 'Open',
  },
  {
    id: 3,
    image: TRAINING_IMAGES[2],
    name: 'Happy Tails Daycare',
    street: 'House 5, Road 2',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801711223344',
    average_rating: 4.7,
    tags: ['Dog', 'Boarding', 'Daycare'],
    services: ['Dog', 'Boarding', 'Daycare'],
    status: 'Open',
  },
  {
    id: 4,
    image: TRAINING_IMAGES[3],
    name: 'Perfect Paws Academy',
    street: 'House 10, Sector 4',
    area: 'Uttara',
    city: 'Dhaka 1230',
    phone_number: '+8801744556677',
    average_rating: 4.6,
    tags: ['Dog', 'Training', 'Boarding'],
    services: ['Dog', 'Training', 'Boarding'],
    status: 'Open',
  },
  {
    id: 5,
    image: TRAINING_IMAGES[0],
    name: 'Whiskers Spa',
    street: 'House 8, Road 1',
    area: 'Mirpur',
    city: 'Dhaka 1216',
    phone_number: '+8801799887766',
    average_rating: 4.9,
    tags: ['Cat', 'Grooming', 'Daycare'],
    services: ['Cat', 'Grooming', 'Daycare'],
    status: 'Open',
  },
];

const TRAINING_FILTER_SECTIONS: FilterSection[] = [
  {
    label: 'Pet Types',
    options: [
      'Dog',
      'Cat',
    ],
  },
  {
    label: 'Services',
    options: [
      'Training',
      'Grooming',
      'Boarding',
      'Daycare',
    ],
  },
];

export default function TrainingGroomingPage() {
  return (
    <ListingFinderPage
      title="TRAINING & GROOMING"
      subtitle="Find the best training and grooming services for your pet."
      searchPlaceholder="Search by location or service"
      items={MOCK_TRAINING_CENTERS}
      resultLabel="Services Found"
      ctaLabel="Book Service"
      ctaIcon={<Scissors size={18} />}
      filterSections={TRAINING_FILTER_SECTIONS}
    />
  );
}
