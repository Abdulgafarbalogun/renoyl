import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';   
// import SignIn from '@/components/signin'; // No longer needed here for Header

export const metadata: Metadata = {
  title: 'Renoyl',
  description: 'Premium hair oils built on natural efficacy, premium quality, and environmental responsibility',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Header /> {/* Remove authContentSlot prop */}
          <main className="flex-1">{children}</main>
        </AuthProvider>
        <footer className="bg-primary-green text-white py-10">
          {/* Footer content here */}
        </footer>
      </body>
    </html>
  );
}
