import { Metadata } from 'next';
import LoginPage from '@/sections/login/Page';

export const metadata: Metadata = {
  title: 'Login | PetGo Care',
  description: 'Login to your PetGo Care account.',
};

export default function LoginRoute() {
  return <LoginPage />;
}
