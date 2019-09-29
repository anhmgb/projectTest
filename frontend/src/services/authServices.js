import { api } from "../ultis/api";

export const login = credentials => {
  return api.post("/auth/login", credentials);
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};
