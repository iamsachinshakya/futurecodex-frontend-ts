"use client";

import { QueryProvider } from "@/app/providers/QueryProvider";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        {children}
        <Toaster position="bottom-right" richColors />
      </QueryProvider>
    </ReduxProvider>
  );
}
