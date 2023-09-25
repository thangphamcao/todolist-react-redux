export const initState = {
    search: '',
    status: 'All',
    priority: [],
};

function filtersReducer(state = initState, action) {
    switch (action.type) {
        case 'FILTER_SEARCH':
            return {
                ...state,
                search: action.payload,
            };

        case 'FILTER_STATUS':
            return {
                ...state,
                status: action.payload,
            };

        case 'FILTER_PRIORITY':
            return {
                ...state,
                priority: action.payload,
            };

        default:
            return state;
    }
}

export default filtersReducer;
