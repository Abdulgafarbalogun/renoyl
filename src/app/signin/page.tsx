// src/app/signin/page.tsx
import SignIn from '@/components/signin';
import Link from 'next/link';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {user ? `Welcome, ${user.name || user.email}` : 'Sign In or Sign Up'}
        </h1>
        
        <SignIn user={user} /> {/* Pass the user prop to SignIn */}

        <div className="mt-6 text-center">
          {/* Example: Link to a separate sign-up page if you build one */}
          {/* <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
}
