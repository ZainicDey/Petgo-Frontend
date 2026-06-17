import type { Metadata } from 'next';
import ListingDetailPage from '@/sections/training-grooming-detail/Page';
import type { ListingDetailData } from '@/sections/training-grooming-detail/Page';

/* ── Mock data matching the API shape ─────────────────────────
   Replace this with a real fetch once the API is ready.
   ─────────────────────────────────────────────────────────── */
const MOCK_DETAILS: Record<number, ListingDetailData> = {
  1: {
    id: 1,
    image: '/vet-hospital-1.png',
    name: 'Paws & Play Training',
    about:
      'Paws & Play Training is Gulshan\'s premier pet training and grooming centre. With over 5 years of experience, we offer comprehensive obedience training, agility courses, and professional grooming services.\n\nOur certified trainers use positive reinforcement techniques to bring out the best in your pets. Whether you need basic obedience training for a puppy or advanced grooming for a show dog, we have you covered.',
    street: 'House 15, Road 7',
    area: 'Gulshan',
    city: 'Dhaka 1212',
    website: 'https://pawsandplay.com.bd',
    opening_hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '16:00' },
    },
    phone_number: '+8801712345678',
    whatsapp_number: '+8801712345678',
    average_rating: 4.8,
    tag_names: ['Dog', 'Cat', 'Grooming'],
    service_names: ['Obedience Training', 'Agility Course', 'Full Grooming', 'Bath & Trim', 'Nail Clipping'],
    veterinarians: [
      {
        id: 501,
        image: null,
        name: 'Rakib Hassan',
        specialization: 'Head Trainer',
        experience: 7,
        order: 1,
      },
      {
        id: 502,
        image: null,
        name: 'Sadia Islam',
        specialization: 'Professional Groomer',
        experience: 5,
        order: 2,
      },
    ],
    created_at: '2024-06-15T10:30:00Z',
    updated_at: '2024-06-15T10:30:00Z',
  },
  2: {
    id: 2,
    image: '/vet-doctor-1.png',
    name: 'Elite Pet Grooming',
    about:
      'Elite Pet Grooming in Banani offers luxury grooming services for dogs and cats. Our team of expert groomers is trained in breed-specific styling and uses only premium, pet-safe products.\n\nWe also offer behavioural training sessions to help your pet become well-mannered and sociable.',
    street: 'House 22, Road 4',
    area: 'Banani',
    city: 'Dhaka 1213',
    website: 'https://elitepetgrooming.bd',
    opening_hours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '14:00' },
      saturday: { open: '10:00', close: '17:00' },
    },
    phone_number: '+8801787654321',
    whatsapp_number: '+8801787654321',
    average_rating: 4.9,
    tag_names: ['Dog', 'Cat', 'Training'],
    service_names: ['Premium Grooming', 'Breed Styling', 'Behaviour Training', 'Puppy Classes'],
    veterinarians: [
      {
        id: 601,
        image: null,
        name: 'Tanvir Ahmed',
        specialization: 'Senior Grooming Specialist',
        experience: 9,
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
  const name = data?.name ?? 'Training & Grooming';
  return {
    title: `${name} | PetGo Care`,
    description: `Book a service at ${name}. View details, services, opening hours, and more on PetGo Care.`,
  };
}

/* ── Page ─────────────────────────────────────────────────── */

export default async function TrainingDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = MOCK_DETAILS[Number(id)];

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold text-[#F7941D]">Service Not Found</h1>
        <p className="text-white/60">We couldn&apos;t find this service. Please go back and try again.</p>
        <a href="/training-grooming" className="mt-4 px-6 py-3 rounded-xl bg-[#F7941D] text-[#1D1D1F] font-semibold hover:bg-[#d87c12] transition-colors">
          Back to Training & Grooming
        </a>
      </main>
    );
  }

  return (
    <main>
      <ListingDetailPage
        data={data}
        backHref="/training-grooming"
        backLabel="Back to Training & Grooming"
        ctaLabel="Book Service"
        aboutHeading="About Us"
        teamHeading="Our Trainers"
      />
    </main>
  );
}
