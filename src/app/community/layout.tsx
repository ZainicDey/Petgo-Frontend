import React from 'react';
import CommunityLayout from '@/sections/community/CommunityLayout';

export default function CommunityRouteLayout({ children }: { children: React.ReactNode }) {
  return <CommunityLayout>{children}</CommunityLayout>;
}
