"use client";

import { AppAuthSync } from "@/app/modules/auth/components/AppAuthSync";
import BottomSheetWrapper from "@/app/modules/ui-wrappers/components/BottomSheetWrapper";
import DialogWrapper from "@/app/modules/ui-wrappers/components/DialogWrapper";
import DrawerWrapper from "@/app/modules/ui-wrappers/components/DrawerWrapper";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <AppAuthSync />
        {children}
        <Toaster position="bottom-right" richColors />
        <BottomSheetWrapper />
        <DialogWrapper />
        <DrawerWrapper />
      </QueryProvider>
    </ReduxProvider>
  );
}
