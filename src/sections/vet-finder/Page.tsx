'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ListingFinderPage } from '@/components/listing';
import type { ListingData } from '@/components/listing';

/* ── Mock Data ─────────────────────────────────────────────── */
const CLINIC_IMAGES = [
  '/vet-hospital-1.png',
  '/vet-doctor-1.png',
  '/vet-hospital-2.png',
  '/vet-pets-group.png',
];

const MOCK_CLINICS: ListingData[] = [
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

export default function VetFinderPage() {
  const router = useRouter();

  const handleCardClick = useCallback((item: ListingData) => {
    router.push(`/vet-finder/${item.id}`);
  }, [router]);

  return (
    <ListingFinderPage
      title="VET FINDER"
      subtitle="Find your vet right from your fingertips."
      searchPlaceholder="Search by service or specialty"
      items={MOCK_CLINICS}
      resultLabel="Clinics Found"
      ctaLabel="Book an Appointment"
      onCardClick={handleCardClick}
    />
  );
}
