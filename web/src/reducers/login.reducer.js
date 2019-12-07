export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'SET_LOGIN_FIELD':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                logged: true,
                isAdmin: action.isAdmin,
                user: action.user,
                errorMessage: '',
            };
        case 'LOGOUT':
            return {
                logged: false,
                isAdmin: undefined,
                errorMessage: '',
            };
        case 'LOGIN_IN_PROCESS':
            return {
                ...state,
                showWait: action.value,
            };
        default:
            return state;
    }
}
