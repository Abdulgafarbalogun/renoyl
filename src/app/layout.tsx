import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renoyl',
  description: 'Premium hair oils built on natural efficacy, premium quality, and environmental responsibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="bg-primary-green text-white py-10">
          {/* Footer content here */}
        </footer>
      </body>
    </html>
  );
}