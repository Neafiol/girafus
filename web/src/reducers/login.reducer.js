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
                isAuthenticated: true,
                isAdmin: action.isAdmin,
            };
        default:
            return state;
    }
}
