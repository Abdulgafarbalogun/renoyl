// src/app/actions.ts
"use server";

import { signIn, signOut } from "@/lib/auth"; // Import from your updated auth file

export async function signInWithGoogle() {
  // You can specify a callbackUrl or redirectTo in the options if needed
  await signIn("google", { redirectTo: "/" });
}

export async function signOutUser() {
  // You can specify a callbackUrl or redirectTo in the options if needed
  await signOut({ redirectTo: "/signin" });
}