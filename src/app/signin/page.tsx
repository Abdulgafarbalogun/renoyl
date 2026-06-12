import type { Metadata } from 'next';
import SignInForm from '@/components/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In — Renoyl',
  description: 'Sign in to your Renoyl account.',
};

export default function SignInPage() {
  return <SignInForm />;
}
