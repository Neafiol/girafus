import {combineReducers} from "redux";

import loginReducer from './login.reducer';
import contextReducer from './context.reducer';

export default combineReducers({
    login: loginReducer,
    context: contextReducer,
});
