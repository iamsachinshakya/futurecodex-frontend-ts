import "@/app/styles/globals.css";
import "@/app/styles/animations.css";
import "@/app/styles/scrollbar.css";
import { BackgroundEffects } from "@/app/modules/dashboard/components/layout/BackgroundEffects";
import { Providers } from "@/app/providers/Providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white scrollbar-custom">
            <BackgroundEffects />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
