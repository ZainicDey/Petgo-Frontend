import type { Metadata } from 'next';
import CheckoutPage from '@/sections/checkout/Page';

export const metadata: Metadata = {
  title: 'Checkout | PetGo Care',
  description:
    'Complete your purchase securely. Enter your shipping details and pay via bKash, Cash on Delivery, or online banking.',
};

export default function CheckoutRoute() {
  return (
    <main>
      <CheckoutPage />
    </main>
  );
}
