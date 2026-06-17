import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import StripeProvider from '@/components/StripeProvider';
import SiteShell from '@/components/SiteShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Renoyl — Premium Hair Oils',
  description: 'Premium hair oils built on natural efficacy, premium quality, and environmental responsibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <StripeProvider>
          <SiteShell>{children}</SiteShell>
        </StripeProvider>
      </body>
    </html>
  );
}
