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
                errorMessage: action.value,
            };
        default:
            return state;
    }
}