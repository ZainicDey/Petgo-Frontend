import { notFound } from 'next/navigation';
import { AdoptionDetailPage } from '@/components/listing';
import { ADOPTION_MOCK_DATA } from '@/sections/pet-adoption/data';

export default async function PetAdoptionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = ADOPTION_MOCK_DATA.find((p) => p.id === Number(id));
  if (!item) return notFound();

  return <AdoptionDetailPage data={item} />;
}
