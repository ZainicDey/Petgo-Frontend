import type { Metadata } from 'next';
import ListingDetailPage from '@/sections/vet-finder-detail/Page';
import type { ListingDetailData } from '@/sections/vet-finder-detail/Page';

/* ── Mock data matching the API shape ─────────────────────────
   Replace this with a real fetch once the API is ready.
   ─────────────────────────────────────────────────────────── */
const MOCK_DETAILS: Record<number, ListingDetailData> = {
  1: {
    id: 1,
    image: '/vet-hospital-1.png',
    name: 'Dhaka Veterinary Hospital',
    about:
      'Dhaka Veterinary Hospital has been serving the Dhaka community for over 15 years with dedication and compassion. Our team of experienced veterinarians and caring staff are committed to providing the highest quality medical care for your beloved pets.\n\nWe offer a comprehensive range of services including preventive care, diagnostic services, surgical procedures, and emergency care. Our state-of-the-art facility is equipped with modern medical technology to ensure accurate diagnoses and effective treatments for all types of pets.',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    website: 'https://www.vetclinic.com.bd',
    opening_hours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '09:00', close: '16:00' },
    },
    phone_number: '+8801711111111',
    whatsapp_number: '+8801711111111',
    average_rating: 4.8,
    tag_names: ['Emergency Care', '24/7 Support', 'Modern Facility'],
    service_names: ['Emergency Care', 'Surgery', 'Dental Care', 'X-Ray', 'Vaccination', 'Grooming'],
    veterinarians: [
      {
        id: 101,
        image: null,
        name: 'Dr. Abdul Rahman',
        specialization: 'Chief Veterinarian',
        experience: 15,
        order: 1,
      },
      {
        id: 102,
        image: null,
        name: 'Dr. Nazia Akter',
        specialization: 'Veterinary Surgeon',
        experience: 10,
        order: 2,
      },
    ],
    created_at: '2024-06-15T10:30:00Z',
    updated_at: '2024-06-15T10:30:00Z',
  },
  2: {
    id: 2,
    image: '/vet-doctor-1.png',
    name: 'Dr. Nabil Chowdhury',
    about:
      'Dr. Nabil Chowdhury is a renowned specialist in exotic pet care, with over a decade of dedicated service. His practice focuses on birds, reptiles, and small mammals, providing specialised care that goes beyond the conventional.',
    street: 'House 12, Road 5',
    area: 'Dhanmondi',
    city: 'Dhaka 1205',
    website: 'https://drnabilvet.com',
    opening_hours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '14:00' },
      saturday: { open: '10:00', close: '17:00' },
    },
    phone_number: '+8801722222222',
    whatsapp_number: '+8801722222222',
    average_rating: 4.6,
    tag_names: ['Exotic Pets', 'Birds & Reptiles'],
    service_names: ['Exotic Pet Consultation', 'Avian Care', 'Reptile Health', 'Lab Tests'],
    veterinarians: [
      {
        id: 201,
        image: null,
        name: 'Dr. Nabil Chowdhury',
        specialization: 'Exotic Pet Specialist',
        experience: 12,
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
  const name = data?.name ?? 'Vet Clinic';
  return {
    title: `${name} | PetGo Care`,
    description: `Book an appointment at ${name}. View contact info, services, opening hours, and more on PetGo Care.`,
  };
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function VetDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = MOCK_DETAILS[Number(id)];

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold text-[#F7941D]">Clinic Not Found</h1>
        <p className="text-white/60">We couldn&apos;t find this clinic. Please go back and try again.</p>
        <a href="/vet-finder" className="mt-4 px-6 py-3 rounded-xl bg-[#F7941D] text-[#1D1D1F] font-semibold hover:bg-[#d87c12] transition-colors">
          Back to Vet Finder
        </a>
      </main>
    );
  }

  return (
    <main>
      <ListingDetailPage data={data} />
    </main>
  );
}
