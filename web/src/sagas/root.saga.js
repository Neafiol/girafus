import {fork} from 'redux-saga/effects'

import {loginSaga} from "./login.saga";

export default function* rootSaga() {
    yield fork(loginSaga);
}