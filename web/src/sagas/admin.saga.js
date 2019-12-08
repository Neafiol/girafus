import {put, select, takeEvery} from "@redux-saga/core/effects";
import {LOGIN, ROOT_ROUTE} from "../constants/routes";

function* createUser(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        let {firstName, lastName, middleName, position, login, password, roles} = action.createUserFields;

        yield fetch(`${ROOT_ROUTE}${LOGIN}`, {
            method: 'POST',
            body: JSON.stringify({
                name: `${firstName || ''} ${lastName || ''} ${middleName || ''}`,
                login,
                password,
                company: action.companyId,
                position,
                roles,
            }),
        });
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'GET_COMPANY_INFO', companyId: action.companyId})
        // yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

export function* adminSaga() {
    yield takeEvery('CREATE_USER', createUser);
}
