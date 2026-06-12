import './globals.css';
import type { Metadata } from 'next';
import StripeProvider from '@/components/StripeProvider';
import SiteShell from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Renoyl',
  description: 'Premium hair oils built on natural efficacy, premium quality, and environmental responsibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <StripeProvider>
          <SiteShell>{children}</SiteShell>
        </StripeProvider>
      </body>
    </html>
  );
}
