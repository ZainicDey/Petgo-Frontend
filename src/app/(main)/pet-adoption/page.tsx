import type { Metadata } from 'next';
import PetAdoptionPage from '@/sections/pet-adoption/Page';

export const metadata: Metadata = {
  title: 'Pet Adoption | PetGo Care',
  description:
    'Connect with loving pets looking for their forever home. We connect pet adopters with pet donors on our 100% free platform.',
};

export default function PetAdoptionRoute() {
  return (
    <main>
      <PetAdoptionPage />
    </main>
  );
}
