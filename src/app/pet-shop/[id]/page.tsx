import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PetShopDetailPage from '@/sections/pet-shop details/Page';

/* ── Static Params ──────────────────────────────────────────── */

export async function generateStaticParams() {
  // Match the 9 product IDs in our mock data
  return Array.from({ length: 9 }, (_, i) => ({ id: String(i + 1) }));
}

/* ── Metadata ───────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Product Details | PetGo Care',
  description: 'View product details, specifications and add to cart on PetGo Care.',
};

/* ── Page ───────────────────────────────────────────────────── */

export default async function PetShopDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId) || productId < 1 || productId > 9) {
    notFound();
  }

  return (
    <main>
      <PetShopDetailPage id={productId} />
    </main>
  );
}
