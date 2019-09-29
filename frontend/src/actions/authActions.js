import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_CURRENT_USER,
  AUTH_GET_CURRENT_USER
} from "../constants/types";

export const login = (credentials, onSuccess, onError, history) => ({
  type: AUTH_LOGIN,
  credentials,
  onSuccess,
  onError,
  history
});

export const logout = history => ({
  type: AUTH_LOGOUT,
  history
});

export const getCurrentUser = () => ({
  type: AUTH_GET_CURRENT_USER
});

export const setCurrentUser = (currentUser, isAuthenticated) => ({
  type: AUTH_SET_CURRENT_USER,
  currentUser,
  isAuthenticated
});
