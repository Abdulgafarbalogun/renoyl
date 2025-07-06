// // src/lib/auth.ts
// import NextAuth, { type NextAuthConfig } from "next-auth"; // Import NextAuthConfig
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import { PrismaClient } from "@prisma/client";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// // Augment the globalThis type to include prisma
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Prisma instance (using globalThis for better practice)
// const prisma = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

// // Define your authConfig with the NextAuthConfig type for better type safety
// export const authConfig: NextAuthConfig = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID!,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET!,
//     }),
//     // EmailProvider({
//     //   server: process.env.EMAIL_SERVER!,
//     //   from: process.env.EMAIL_FROM!,
//     // }),
//     // Add other providers as needed
//   ],
//   secret: process.env.AUTH_SECRET,
//   // You might want to configure session strategy, pages, or callbacks here
//   // For example:
//   // session: { strategy: "jwt" }, // Or "database"
//   // pages: {
//   //   signIn: '/signin', // If you have a custom sign-in page
//   // },
//   // callbacks: {
//   //   async session({ session, token, user }) {
//   //     // Example: Add user ID from token or user object to session
//   //     if (token && session.user) {
//   //       session.user.id = token.sub;
//   //     } else if (user && session.user) {
//   //       session.user.id = user.id;
//   //     }
//   //     return session;
//   //   },
//   // },
// };

// // Destructure and export handlers, auth, signIn, signOut
// export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Mock implementation to prevent errors
export const handlers = {
  GET: () => new Response('Auth disabled'),
  POST: () => new Response('Auth disabled')
};

export const auth = async () => null;
export const signIn = async () => null;
export const signOut = async () => null;
