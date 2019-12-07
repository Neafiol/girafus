export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'CONTEXT_SHOW_WAIT':
            return {
                ...state,
                showWait: action.value,
            };
        default:
            return { ...state };
    }
}
