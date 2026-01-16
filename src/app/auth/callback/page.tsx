"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthCallbackPage() {
  const router = useRouter();
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    const finalizeLogin = async () => {
      await loadUser();
      router.replace("/");
    };

    finalizeLogin();
  }, [loadUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Signing you in…</p>
    </div>
  );
}
