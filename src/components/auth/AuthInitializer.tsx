"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const loadUser = useAuthStore((state) => state.loadUser);
  const authLoading = useAuthStore((state) => state.authLoading);

  useEffect(() => {
    if (authLoading) {
      loadUser();
    }
  }, [authLoading, loadUser]);

  return null;
}
