// TODO-LIST
export const add = (payload) => {
    return {
        type: 'ADD_TODO',
        payload: payload,
    };
};

export const updateStatus = (payload) => {
    return {
        type: 'UPDATE_STATUS',
        payload: payload,
    };
};

export const del = (payload) => {
    return {
        type: 'DEL_TODO',
        payload: payload,
    };
};

export const edit = (payload) => {
    return {
        type: 'EDIT_TODO',
        payload: payload,
    };
};

export const cancel = () => {
    return {
        type: 'CANCEL_EDIT',
    };
};

// FILTERS
export const filterSearch = (payload) => {
    return {
        type: 'FILTER_SEARCH',
        payload: payload,
    };
};

export const filterStatus = (payload) => {
    return {
        type: 'FILTER_STATUS',
        payload: payload,
    };
};

export const filterPriority = (payload) => {
    return {
        type: 'FILTER_PRIORITY',
        payload: payload,
    };
};
