import { create } from "zustand";
import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  authLoading: boolean; // 🔑 for route protection
  actionLoading: boolean; // 🔑 for buttons
  error: string | null;

  loadUser: () => Promise<void>;
  login: (data: {
    email?: string;
    phone?: string;
    password: string;
  }) => Promise<void>;
  register: (data: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string }) => Promise<void>;
  changePassword: (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  authLoading: true, // 👈 starts true
  actionLoading: false,
  error: null,

  loadUser: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({
        user: data.user,
        isAuthenticated: true,
        authLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        authLoading: false,
      });
    }
  },

  login: async (formData) => {
    try {
      set({ actionLoading: true, error: null });
      const { data } = await api.post("/auth/login", formData);
      set({
        user: data.user,
        isAuthenticated: true,
        actionLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        actionLoading: false,
      });
    }
  },

  register: async (formData) => {
    try {
      set({ actionLoading: true, error: null });
      const { data } = await api.post("/auth/register", formData);
      set({
        user: data.user,
        isAuthenticated: true,
        actionLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        actionLoading: false,
      });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },
  updateProfile: async (formData) => {
    try {
      set({ actionLoading: true, error: null });

      const { data } = await api.put("/auth/me/update", formData);

      set({
        user: data.user,
        actionLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Profile update failed",
        actionLoading: false,
      });
    }
  },
  changePassword: async (formData) => {
    try {
      set({ actionLoading: true, error: null });

      const { data } = await api.put("/auth/password/update", formData);

      set({
        user: data.user,
        isAuthenticated: true,
        actionLoading: false,
      });

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Password update failed",
        actionLoading: false,
      });

      return false;
    }
  },
}));
