// src/app/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  redirect("/api/auth/signin/google");
}

export async function signOutUser() {
  redirect("/api/auth/signout");
}