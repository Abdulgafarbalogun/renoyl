
// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

export const handlers = {
  GET: () => new Response('Auth disabled'),
  POST: () => new Response('Auth disabled')
};

export const auth = async () => ({ user: null });
export const signIn = async () => null;
export const signOut = async () => null;