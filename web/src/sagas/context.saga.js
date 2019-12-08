import {put, takeEvery} from 'redux-saga/effects';
import {ROOT_ROUTE, COMPANY, RULES, ROLES} from "../constants/routes";

function* getCompanies(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        // todo: when backend is ready change request for user
        // let response = yield fetch(`${ROOT_ROUTE}${COMPANY}?user_id=${action.userId}`)
        let response = yield fetch(`${ROOT_ROUTE}${COMPANY}`)
            .then(response => response.json());

        yield put({type: 'SET_COMPANIES', companies: response});
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

function* getCompanyInfo(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        let response = yield fetch(`${ROOT_ROUTE}${COMPANY}?company_id=${action.companyId}`)
            .then(response => response.json());

        yield put({type: 'SET_COMPANY', company: response});
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

function* getUserRules(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        let response = yield fetch(`${ROOT_ROUTE}${RULES}?user_id=${action.userId}`)
            .then(response => response.json());

        yield put({type: 'SET_USER_RULES', companyId: action.companyId, userId: action.userId, rules: response});
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

function* getRoles(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        let response = yield fetch(`${ROOT_ROUTE}${ROLES}`)
            .then(response => response.json());

        yield put({type: 'SET_ROLES', roles: response});
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

function* getRoleRules(action) {
    try {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: true});

        let response = yield fetch(`${ROOT_ROUTE}${RULES}?role_id=${action.roleId}`)
            .then(response => response.json());

        yield put({type: 'SET_ROLE_RULES', roleId: action.roleId, rules: response});
    } catch (error) {
        console.warn(error);
    } finally {
        yield put({type: 'CONTEXT_SHOW_WAIT', value: false});
    }
}

export function* contextSaga() {
    yield takeEvery('GET_COMPANIES', getCompanies);
    yield takeEvery('GET_COMPANY_INFO', getCompanyInfo);
    yield takeEvery('GET_USER_RULES', getUserRules);
    yield takeEvery('GET_ROLES', getRoles);
    yield takeEvery('GET_ROLE_RULES', getRoleRules);
}
