"use server";

import { signIn, signOut } from "next-auth/react";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signOutUser() {
  await signOut();
}
