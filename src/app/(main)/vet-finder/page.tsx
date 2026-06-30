import type { Metadata } from 'next';
import VetFinderPage from '@/sections/vet-finder/Page';

export const metadata: Metadata = {
  title: 'Vet Finder | PetGo Care',
  description:
    'Find the best veterinary clinics near you. Search by specialty, service, and area. Book appointments instantly with PetGo Care.',
};

export default function VetFinderRoute() {
  return (
    <main>
      <VetFinderPage />
    </main>
  );
}
