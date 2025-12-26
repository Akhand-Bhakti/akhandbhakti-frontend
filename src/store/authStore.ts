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
  loading: boolean;
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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  loadUser: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get("/auth/me");
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  login: async (formData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/auth/login", formData);
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  register: async (formData) => {
    try {
      set({ loading: true, error: null });
      const { data } = await api.post("/auth/register", formData);
      set({
        user: data.user,
        isAuthenticated: true, // auto-login
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
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
}));
