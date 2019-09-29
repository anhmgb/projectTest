import { AUTH_LOGIN } from "../constants/types";

export const login = (credentials, onSuccess, onError) => ({
  type: AUTH_LOGIN,
  credentials,
  onSuccess,
  onError
});
