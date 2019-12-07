import {combineReducers} from "redux";

import loginReducer from './login.reducer';
import companyReducer from './company.reducer';
import contextReducer from './context.reducer';

export default combineReducers({
    login: loginReducer,
    companies: companyReducer,
    context: contextReducer,
});
