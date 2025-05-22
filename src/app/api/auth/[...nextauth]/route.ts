// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Adjust path to your auth.ts file if it's different
export const { GET, POST } = handlers;