import {put, select, takeEvery} from 'redux-saga/effects';
import {ROOT_ROUTE, LOGIN} from "../constants/routes";

function* doLogin() {
    try {
        yield put({type: 'LOGIN_IN_PROCESS', value: true});
        let login = yield select(state => state.login.login);
        let password = yield select(state => state.login.password);

        let response = yield fetch(`${ROOT_ROUTE}${LOGIN}?login=${login}&password=${password}`)
            .then(response => response.json());

        if (response.status) {
            yield put({type: 'LOGIN_SUCCESS', user: response.user});
        } else {
            yield put({type: 'LOGIN_ERROR', errorMessage: 'Пользователь не найден или неверный пароль'});
        }
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'LOGIN_IN_PROCESS', value: false});
    }
}

export function* loginSaga() {
    yield takeEvery('DO_LOGIN', doLogin);
}
