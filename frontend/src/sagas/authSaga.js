import { call, put, fork, takeLatest } from "redux-saga/effects";
import { login } from "../services/authServices";
import { AUTH_LOGIN } from "../constants/types";

export function* userLogin(action) {
  try {
    const result = yield call(login, action.credentials);
    console.log(result);
    action.onSuccess(false);
  } catch (e) {
    action.onError({
      password: "Wrong email or password"
    });
  }
}

export function* watchLogin() {
  yield takeLatest(AUTH_LOGIN, userLogin);
}

export default function* authSaga() {
  yield fork(watchLogin);
}
