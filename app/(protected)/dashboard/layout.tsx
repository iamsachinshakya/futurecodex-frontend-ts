"use client";

import "@/app/styles/globals.css";
import "@/app/styles/animations.css";
import "@/app/styles/scrollbar.css";
import { BackgroundEffects } from "@/app/modules/dashboard/components/layout/BackgroundEffects";
import { ReduxProvider } from "@/app/store/providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white scrollbar-custom">
        <ReduxProvider>
          <>
            <BackgroundEffects />
            {children}
          </>
        </ReduxProvider>
      </body>
    </html>
  );
}
