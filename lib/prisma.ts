import { PrismaClient } from "@prisma/client";

// This tells TypeScript that we're adding prisma to the global object
// so we can reuse the same connection across hot reloads
declare global {
  var prisma: PrismaClient | undefined;
}

// In production: always create a new client
// In development: reuse the existing one (stored on globalThis)
const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;