const initialState = {
    showWait: false,
    companies: undefined,
    roles: undefined,
};

export default function reducer(state = initialState, action) {
    let companies = {...state.companies};
    let roles = {...state.roles};
    switch (action.type) {
        case 'CONTEXT_SHOW_WAIT':
            return {
                ...state,
                showWait: action.value,
            };
        case 'SET_COMPANY':
            let company = {...action.company};
            company.users = {};
            action.company.users.forEach(user => {
                company.users[user.id] = user;
            });
            companies[company.id] = company;
            return {
                ...state,
                companies: companies,
            };
        case 'SET_COMPANIES':
            companies = {};
            action.companies.forEach(company => {
                companies[company.id] = company;
            });
            return {
                ...state,
                companies: companies,
            };
        case 'SET_USER_RULES':
            companies[action.companyId].users[action.userId].rules = action.rules;
            return {
                ...state,
                companies: companies,
            };
        case 'SET_ROLES':
            roles = {};
            action.roles.forEach(role => {
                roles[role.id] = role;
            });
            return {
                ...state,
                roles: roles,
            };
        case 'SET_ROLE_RULES':
            roles[action.roleId].rules = action.rules;
            return {
                ...state,
                roles: roles,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return { ...state };
    }
}
