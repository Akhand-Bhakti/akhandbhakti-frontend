import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// Axios config
const client = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Types
export interface AdminUser {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: string;
}

// Get all users
export const getAllUsers = async (): Promise<AdminUser[]> => {
  const { data } = await client.get("/auth/admin/users");
  return data.users;
};

// Update role
export const updateUserRole = async (
  userId: string,
  role: "user" | "admin"
) => {
  const { data } = await client.put(`/auth/admin/user/${userId}`, { role });
  return data.user;
};

// Delete user
export const deleteUser = async (userId: string) => {
  const { data } = await client.delete(`/auth/admin/user/${userId}`);
  return data;
};
