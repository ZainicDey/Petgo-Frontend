import type { Metadata } from 'next';
import CommunityPage from '@/sections/community/CommunityPage';

export const metadata: Metadata = {
  title: 'Community | PetGo Care',
  description: 'Join the PetGo community — share threads, connect with pet lovers, and stay updated on all things pet care in Bangladesh.',
};

export default function CommunityRoute() {
  return <CommunityPage />;
}
