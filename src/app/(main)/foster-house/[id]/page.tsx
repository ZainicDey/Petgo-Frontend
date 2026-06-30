import type { Metadata } from 'next';
import Link from 'next/link';
import { ListingDetailPage, type ListingDetailData } from '@/components/listing';

/* ── Mock data matching the API shape ─────────────────────────
   Replace this with a real fetch once the API is ready.
   ─────────────────────────────────────────────────────────── */
const MOCK_DETAILS: Record<number, ListingDetailData> = {
  1: {
    id: 1,
    image: '/foster-1.png',
    name: 'The Rahman Family Home',
    about:
      'The Rahman Family Home has been a trusted foster home in Dhanmondi for over 8 years. We provide a warm, loving environment for pets in need of temporary shelter.\n\nOur home features a spacious fenced yard, dedicated pet rooms, and round-the-clock care. We specialise in caring for dogs and cats, including those with special medical needs.',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    website: 'https://rahmanfoster.com.bd',
    opening_hours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '10:00', close: '16:00' },
    },
    phone_number: '+8801711111111',
    whatsapp_number: '+8801711111111',
    average_rating: 4.8,
    tag_names: ['Dog', 'Cat', 'Fenced Yard'],
    service_names: ['Dog Care', 'Cat Care', 'Special Needs', 'Emergency Foster'],
    veterinarians: [
      {
        id: 301,
        image: null,
        name: 'Aminul Rahman',
        specialization: 'Lead Caregiver',
        experience: 8,
        order: 1,
      },
      {
        id: 302,
        image: null,
        name: 'Fatima Rahman',
        specialization: 'Pet Nutrition Specialist',
        experience: 6,
        order: 2,
      },
    ],
    created_at: '2024-06-15T10:30:00Z',
    updated_at: '2024-06-15T10:30:00Z',
  },
  2: {
    id: 2,
    image: '/foster-2.png',
    name: 'Foster Family Care Dhaka',
    about:
      'Foster Family Care Dhaka is dedicated to providing a safe haven for rescued and abandoned pets. Our experienced team ensures each animal receives personalised attention, proper nutrition, and medical care during their stay.',
    street: 'House 45, Road 8',
    area: 'Gulshan',
    city: 'Dhaka 1212',
    website: 'https://fosterfamilycare.bd',
    opening_hours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '10:00', close: '16:00' },
    },
    phone_number: '+8801722222222',
    whatsapp_number: '+8801722222222',
    average_rating: 4.6,
    tag_names: ['Dog', 'Cat', 'Emergency Care'],
    service_names: ['Dog Boarding', 'Cat Boarding', 'Emergency Foster', 'Post-Surgery Care'],
    veterinarians: [
      {
        id: 401,
        image: null,
        name: 'Karim Hossain',
        specialization: 'Senior Caregiver',
        experience: 10,
        order: 1,
      },
    ],
    created_at: '2024-06-15T10:30:00Z',
    updated_at: '2024-06-15T10:30:00Z',
  },
};

/* ── Metadata ─────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = MOCK_DETAILS[Number(id)];
  const name = data?.name ?? 'Foster Home';
  return {
    title: `${name} | PetGo Care`,
    description: `Contact ${name}. View details, amenities, opening hours, and more on PetGo Care.`,
  };
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function FosterDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = MOCK_DETAILS[Number(id)];

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold text-[#F7941D]">Foster Home Not Found</h1>
        <p className="text-white/60">We couldn&apos;t find this foster home. Please go back and try again.</p>
        <Link href="/foster-house" className="mt-4 px-6 py-3 rounded-xl bg-[#F7941D] text-[#1D1D1F] font-semibold hover:bg-[#d87c12] transition-colors">
          Back to Foster Homes
        </Link>
      </main>
    );
  }

  return (
    <main>
      <ListingDetailPage
        data={data}
        backHref="/foster-house"
        backLabel="Back to Foster Homes"
        ctaLabel="Contact Foster Home"
        aboutHeading="About Us"
        teamHeading="Our Caregivers"
      />
    </main>
  );
}
