import {put, select, takeEvery} from 'redux-saga/effects';
import {ROOT_ROUTE, LOGIN} from "../constants/routes";

function* doLogin() {
    try {
        yield put({type: 'LOGIN_IN_PROCESS', value: true});
        let login = yield select(state => state.login.login);
        let password = yield select(state => state.login.password);

        fetch(`${ROOT_ROUTE}${LOGIN}?login=${login}&password=${password}`)
            .then(response => response.json())
            .then(response => {
                console.log(JSON.stringify(response));
            });
    } catch (error) {

    } finally {
        yield put({type: 'LOGIN_IN_PROCESS', value: false});
    }
}

export function* loginSaga() {
    yield takeEvery('DO_LOGIN', doLogin);
}