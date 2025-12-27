import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getUsers = () => API.get("/admin/users");
export const createUser = (data) => API.post("/admin/users", data);
export const updateUser = (id, data) => API.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
