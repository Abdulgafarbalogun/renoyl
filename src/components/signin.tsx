// src/components/signin.tsx
// src/components/signin.tsx
import { auth } from "@/lib/auth";
import { signInWithGoogle, signOutUser } from "@/app/actions";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;

  console.log("Session:", session);
  console.log("User:", user);

  return (
    <div>
      {user ? (
        <form action={async () => {
          "use server";
          await signOutUser();
        }}>
          <p className="mb-2">Signed in as {user.email}</p>
          <button type="submit" className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Sign Out
          </button>
        </form>
      ) : (
        <form action={async () => {
          "use server";
          await signInWithGoogle();
        }}>
          <p className="mb-4 text-center">Sign in to continue.</p>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Sign In with Google
          </button>
        </form>
      )}
    </div>
  );
}
