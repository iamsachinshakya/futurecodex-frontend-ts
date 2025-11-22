import AuthGuard from "@/app/modules/auth/components/AuthGuard";
import DashboardPage from "@/app/modules/dashboard/DashboardPage";
import React from "react";

function page() {
  return (
    <div>
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    </div>
  );
}

export default page;
