// Remove "use client"; if you intend this to be a Server Component primarily
// import { useSession, signIn, signOut } from "next-auth/react"; // Not needed if using async Home with auth()
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import ImageGallery from '@/components/ImageGallery';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
// import SignIn from '@/components/signin'; // SignIn is no longer passed to Header
// import { auth } from "@/lib/auth"; // auth() might still be needed if other parts of the page depend on session

// Option 1: If you keep the async Home component
export default async function Home() { 
  // const session = await auth(); // You might still need session for other parts of the page
  // const user = session?.user;

  return (
    <>
      <Header /> {/* Removed authContentSlot prop */}
      <Hero />
      <ProductShowcase />
      <ImageGallery />
      <CustomerReviews />
      <Footer />
    </>
  );
}

// You MUST remove or comment out this second Home component definition:
/*
export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Header authContentSlot={<SignIn />} />
        <Hero />
        <ProductShowcase />
        <ImageGallery />
        <CustomerReviews />
        <Footer />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
      <Header authContentSlot={<SignIn />} />
      <Hero />
      <ProductShowcase />
      <ImageGallery />
      <CustomerReviews />
      <Footer />
    </>
  );
}
*/