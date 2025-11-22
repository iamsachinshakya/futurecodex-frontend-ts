"use client";

import { useUser } from "@/app/modules/auth/hooks/useAuth";

export function AppAuthSync() {
  useUser();
  return null;
}
