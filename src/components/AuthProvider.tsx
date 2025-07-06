"use client";

// import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <>{children}</>
  );
}

export default AuthProvider;