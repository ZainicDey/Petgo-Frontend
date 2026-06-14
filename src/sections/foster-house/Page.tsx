'use client';

import React from 'react';
import { ListingFinderPage } from '@/components/listing';
import type { ListingData, FilterSection } from '@/components/listing';

/* ── Mock Images (reusing vet images for now) ──────────────── */
const FOSTER_IMAGES = [
  '/foster-1.png',
  '/foster-2.png',
  '/foster-3.png',
  '/foster-4.png',
];

/* ── Mock Foster Homes ─────────────────────────────────────── */
const MOCK_FOSTER_HOMES: ListingData[] = [
  {
    id: 1,
    image: FOSTER_IMAGES[0],
    name: 'The Rahman Family Home',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801711111111',
    average_rating: 4.8,
    tags: ['Dog', 'Cat', 'Fenced Yard'],
    services: ['Dog', 'Cat', 'Fenced Yard'],
    status: 'Open',
  },
  {
    id: 2,
    image: FOSTER_IMAGES[1],
    name: 'Foster Family Care Dhaka',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801722222222',
    average_rating: 4.8,
    tags: ['Dog', 'Cat', 'Emergency Care'],
    services: ['Dog', 'Cat', 'Emergency Care'],
    status: 'Open',
  },
  {
    id: 3,
    image: FOSTER_IMAGES[2],
    name: 'The Rahman Family Home',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801733333333',
    average_rating: 4.8,
    tags: ['Dog', 'Fenced Yard', 'Grooming'],
    services: ['Dog', 'Fenced Yard', 'Grooming'],
    status: 'Open',
  },
  {
    id: 4,
    image: FOSTER_IMAGES[3],
    name: 'Pawfect Foster Home',
    street: 'House 45, Road 8',
    area: 'Gulshan',
    city: 'Dhaka 1212',
    phone_number: '+8801744444444',
    average_rating: 4.6,
    tags: ['Dog', 'Surgery', 'Special Needs Care'],
    services: ['Dog', 'Surgery', 'Special Needs Care'],
    status: 'Open',
  },
  {
    id: 5,
    image: FOSTER_IMAGES[2],
    name: 'Happy Tails Foster',
    street: 'House 9, Road 3',
    area: 'Banani',
    city: 'Dhaka 1213',
    phone_number: '+8801755555555',
    average_rating: 4.9,
    tags: ['Cat', 'Dental Care', 'Fenced Yard'],
    services: ['Cat', 'Dental Care', 'Fenced Yard'],
    status: 'Open',
  },
  {
    id: 6,
    image: FOSTER_IMAGES[1],
    name: 'Khans Pet Sanctuary',
    street: 'House 22, Sector 7',
    area: 'Uttara',
    city: 'Dhaka 1230',
    phone_number: '+8801766666666',
    average_rating: 4.7,
    tags: ['Dog', 'Grooming', 'Surgery'],
    services: ['Dog', 'Grooming', 'Surgery'],
    status: 'Open',
  },
  {
    id: 7,
    image: FOSTER_IMAGES[0],
    name: 'Mirpur Foster Family',
    street: 'House 5, Block C',
    area: 'Mirpur',
    city: 'Dhaka 1216',
    phone_number: '+8801777777777',
    average_rating: 4.5,
    tags: ['Cat', 'Dog', 'Special Needs Care'],
    services: ['Cat', 'Dog', 'Special Needs Care'],
    status: 'Open',
  },
  {
    id: 8,
    image: FOSTER_IMAGES[1],
    name: 'Safe Haven Foster Home',
    street: 'House 18, Road 12',
    area: 'Bashundhara',
    city: 'Dhaka 1229',
    phone_number: '+8801788888888',
    average_rating: 4.8,
    tags: ['Fenced Yard', 'Emergency Care', 'Dental Care'],
    services: ['Fenced Yard', 'Emergency Care', 'Dental Care'],
    status: 'Open',
  },
  {
    id: 9,
    image: FOSTER_IMAGES[3],
    name: 'The Ahmed Family Foster',
    street: 'House 7, Road 2',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    phone_number: '+8801799999999',
    average_rating: 4.9,
    tags: ['Dog', 'Cat', 'Grooming'],
    services: ['Dog', 'Cat', 'Grooming'],
    status: 'Open',
  },
];

const FOSTER_FILTER_SECTIONS: FilterSection[] = [
  {
    label: 'Pet Types',
    options: [
      'Dog',
      'Cat',
    ],
  },
  {
    label: 'Amenities & Services',
    options: [
      'Fenced Yard',
      'Emergency Care',
      'Surgery',
      'Dental Care',
      'Grooming',
      'Special Needs Care',
    ],
  },
];

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clipPath="url(#clip0_2029_2344)">
      <path d="M12.5415 4.16665C13.3555 4.32545 14.1035 4.72353 14.6899 5.30993C15.2763 5.89632 15.6744 6.64437 15.8332 7.45831M12.5415 0.833313C14.2326 1.02118 15.8095 1.77846 17.0134 2.98082C18.2173 4.18318 18.9765 5.75915 19.1665 7.44998M18.3332 14.1V16.6C18.3341 16.8321 18.2866 17.0618 18.1936 17.2744C18.1006 17.4871 17.9643 17.678 17.7933 17.8349C17.6222 17.9918 17.4203 18.1112 17.2005 18.1856C16.9806 18.2599 16.7477 18.2875 16.5165 18.2666C13.9522 17.988 11.489 17.1118 9.32486 15.7083C7.31139 14.4289 5.60431 12.7218 4.32486 10.7083C2.91651 8.53432 2.04007 6.05914 1.76653 3.48331C1.7457 3.25287 1.77309 3.02061 1.84695 2.80133C1.9208 2.58205 2.03951 2.38055 2.1955 2.20966C2.3515 2.03877 2.54137 1.90224 2.75302 1.80875C2.96468 1.71526 3.19348 1.66686 3.42486 1.66665H5.92486C6.32928 1.66267 6.72136 1.80588 7.028 2.06959C7.33464 2.3333 7.53493 2.69952 7.59153 3.09998C7.69705 3.90003 7.89274 4.68559 8.17486 5.44165C8.28698 5.73992 8.31125 6.06408 8.24478 6.37571C8.17832 6.68735 8.02392 6.97341 7.79986 7.19998L6.74153 8.25831C7.92783 10.3446 9.65524 12.072 11.7415 13.2583L12.7999 12.2C13.0264 11.9759 13.3125 11.8215 13.6241 11.7551C13.9358 11.6886 14.2599 11.7129 14.5582 11.825C15.3143 12.1071 16.0998 12.3028 16.8999 12.4083C17.3047 12.4654 17.6744 12.6693 17.9386 12.9812C18.2029 13.2931 18.3433 13.6913 18.3332 14.1Z" stroke="#1D1D1F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2029_2344">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default function FosterHousePage() {
  return (
    <ListingFinderPage
      title="FOSTER HOUSE FINDER"
      subtitle="Find your vet right from your fingertips."
      searchPlaceholder="Search by location or foster type"
      items={MOCK_FOSTER_HOMES}
      resultLabel="Foster Homes Found"
      ctaLabel="Contact Foster Home"
      ctaIcon={<PhoneIcon />}
      filterSections={FOSTER_FILTER_SECTIONS}
    />
  );
}
