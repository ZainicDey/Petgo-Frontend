import type { Metadata } from 'next';
import FosterHousePage from '@/sections/foster-house/Page';

export const metadata: Metadata = {
  title: 'Foster House Finder | PetGo Care',
  description:
    'Find trusted foster homes for your pets. Search by location, amenities, and pet type. Connect instantly with foster families through PetGo Care.',
};

export default function FosterHouseRoute() {
  return (
    <main>
      <FosterHousePage />
    </main>
  );
}
