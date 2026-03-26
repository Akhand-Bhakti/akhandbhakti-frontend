import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// 👉 Add this interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();

      config.headers["x-user-ip"] = data.ip;
    } catch (err) {
      console.error("Failed to attach IP", err);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
