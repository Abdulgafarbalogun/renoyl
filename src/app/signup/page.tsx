import type { Metadata } from 'next';
import SignUpForm from '@/components/SignUpForm';

export const metadata: Metadata = {
  title: 'Create Account — Renoyl',
  description: 'Create a Renoyl account to track your orders and manage your profile.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
