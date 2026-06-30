import type { Metadata } from 'next';
import TrainingGroomingPage from '@/sections/training-grooming/Page';

export const metadata: Metadata = {
  title: 'Training & Grooming | PetGo Care',
  description:
    'Find the best training and grooming services for your pet. Connect with experts for boarding, daycare, grooming and obedience training.',
};

export default function TrainingGroomingRoute() {
  return (
    <main>
      <TrainingGroomingPage />
    </main>
  );
}
