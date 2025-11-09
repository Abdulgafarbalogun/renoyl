import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import StripeProvider from '@/components/StripeProvider'; // Import StripeProvider

export const metadata: Metadata = {
  title: 'Renoyl',
  description: 'Premium hair oils built on natural efficacy, premium quality, and environmental responsibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <StripeProvider> {/* Wrap with StripeProvider */}
            <Header />
            <main className="flex-1">{children}</main>
          </StripeProvider>
        </AuthProvider>
        <footer className="bg-primary-green text-white py-10">
          {/* Footer content here */}
        </footer>
      </body>
    </html>
  );
}
