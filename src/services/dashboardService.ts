import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const getDashboardStats = async () => {
  const { data } = await client.get("/analytics/admin/dashboard");
  return data;
};
