export default function reducer(state = [], action) {
    switch (action.type) {
        case 'SET_COMPANY':
            let companies = [...state];
            let idx = companies.map(c => c.id).indexOf(action.company.id);
            if (idx !== -1) {
                companies[idx] = action.company;
            } else {
                companies.push(action.company);
            }
            return companies;
        case 'SET_COMPANIES':
            return action.companies || [];
        case 'LOGOUT':
            return [];
        default:
            return [...state];
    }
}
