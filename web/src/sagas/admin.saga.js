import {put, select, takeEvery} from "@redux-saga/core/effects";
import { ROOT_ROUTE, LOGIN, ROLES } from "../constants/routes";

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
        yield put({type: 'GET_COMPANY_INFO', companyId: action.companyId});
        // yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

function* updateRole(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        yield fetch(`${ROOT_ROUTE}${ROLES}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: action.roleName,
                role_id: action.roleId,
            }),
        });
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'GET_ROLES'});
        // yield put({type: 'GET_ROLE_RULES', roleId: action.roleId});
    }
}

export function* adminSaga() {
    yield takeEvery('CREATE_USER', createUser);
    yield takeEvery('UPDATE_ROLE', updateRole);
}
