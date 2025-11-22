"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectAuthIsLoggedIn,
  selectAuthLoading,
  selectAuthUser,
} from "@/app/modules/auth/redux/authSlice";
import { UserRole } from "@/app/modules/users/types/IUserTypes";
import Loader from "@/app/shared/components/loader/Loader";

const ALLOWED_ROLES = [UserRole.ADMIN, UserRole.AUTHOR, UserRole.EDITOR];

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const authUser = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const router = useRouter();

  // Checks if user has an allowed role
  const hasAccess =
    isLoggedIn && authUser && ALLOWED_ROLES.includes(authUser.role);

  useEffect(() => {
    // Only redirect when auth is checked, and user does not have access
    if (!loading && !hasAccess) {
      router.replace("/");
    }
  }, [loading, hasAccess, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Loader />
      </div>
    );
  }

  // Not authenticated or not allowed role (redirect handled in useEffect)
  if (!hasAccess) {
    return null;
  }

  // Authenticated and allowed role: render protected children
  return <>{children}</>;
}
