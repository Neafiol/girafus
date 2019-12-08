import {fork} from 'redux-saga/effects'

import {loginSaga} from "./login.saga";
import {contextSaga} from "./context.saga";
import {adminSaga} from "./admin.saga";

export default function* rootSaga() {
    yield fork(loginSaga);
    yield fork(contextSaga);
    yield fork(adminSaga);
}
