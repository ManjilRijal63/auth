import { handlers } from "@/lib/auth";

// This exposes GET and POST endpoints at /api/auth/*
// Auth.js uses these internally for:
// GET  /api/auth/signin     — show sign in
// GET  /api/auth/callback/google — handle Google redirect
// POST /api/auth/signout   — handle logout
// etc.
export const { GET, POST } = handlers;