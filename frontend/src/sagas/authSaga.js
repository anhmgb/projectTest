import { call, put, fork, takeLatest } from "redux-saga/effects";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_GET_CURRENT_USER
} from "../constants/types";
import setAuthToken from "../ultis/setAuthToken";

import { login, getCurrentUser } from "../services/authServices";
import { setCurrentUser } from "../actions/authActions";

export function* userLogin(action) {
  try {
    const result = yield call(login, action.credentials);
    const token = result.data.access_token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    yield put(setCurrentUser(result.data.user, true));
    action.onSuccess(false);
    setTimeout(() => action.history.push("/"), 100);
  } catch (e) {
    action.onError({
      password: "Wrong email or password"
    });
    action.onSuccess(false);
  }
}

export function* userLogout(action) {
  try {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    yield put(setCurrentUser({}, false));
    setTimeout(() => action.history.push("/login"), 100);
  } catch (e) {}
}

export function* fetchCurrentUser(action) {
  try {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    const result = yield call(getCurrentUser);
    yield put(setCurrentUser(result.data, true));
  } catch (e) {}
}

export function* watchLogin() {
  yield takeLatest(AUTH_LOGIN, userLogin);
}

export function* watchLogout() {
  yield takeLatest(AUTH_LOGOUT, userLogout);
}

export function* watchFetchCurrentUser() {
  yield takeLatest(AUTH_GET_CURRENT_USER, fetchCurrentUser);
}

export default function* authSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchFetchCurrentUser);
}
