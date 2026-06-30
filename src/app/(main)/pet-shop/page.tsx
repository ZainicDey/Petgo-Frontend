import type { Metadata } from 'next';
import PetShopPage from '@/sections/pet-shop/Page';

export const metadata: Metadata = {
  title: 'Pet Shop | PetGo Care',
  description:
    'Shop premium pet food, toys, accessories and more. Everything your pet needs, delivered to your doorstep with PetGo Care.',
};

export default function PetShopRoute() {
  return (
    <main>
      <PetShopPage />
    </main>
  );
}
