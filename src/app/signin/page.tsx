// src/app/signin/page.tsx
import SignIn from '@/components/signin';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In or Sign Up</h1>
        
        {/* Your SignIn component will handle showing Google Sign-In / User Info */}
        <SignIn />

        {/* You can add more options here later, like Email/Password form */}
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
