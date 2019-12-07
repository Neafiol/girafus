import {fork} from 'redux-saga/effects'

import {loginSaga} from "./login.saga";
import {companySaga} from "./company.saga";

export default function* rootSaga() {
    yield fork(loginSaga);
    yield fork(companySaga);
}
