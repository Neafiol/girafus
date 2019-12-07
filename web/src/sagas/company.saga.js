import {put, select, call, takeEvery} from 'redux-saga/effects';
import {ROOT_ROUTE, COMPANY} from "../constants/routes";

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

export function* companySaga() {
    yield takeEvery('GET_COMPANIES', getCompanies);
    yield takeEvery('GET_COMPANY_INFO', getCompanyInfo);
}
