import axios from "axios";
export const userService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const loginService = axios.create({
  baseURL: "http://localhost:3001",
});

// userDetails
export const getUser = async () => await userService.get("/users");
export const editUser = async (id, data) =>
  await userService.put(`/users/${id}`, data);
export const deleteUser = async (id) =>
  await userService.delete(`/users/${id}`);

// user login
export const getLogin = async () => await loginService.get("/login");
export const createLogin = async (data) =>
  await loginService.post("/login", data);
export const editLogin = async (id, data) =>
  await loginService.put(`/login/${id}`, data);
