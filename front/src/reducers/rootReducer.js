let rootReducer = (state, action) => {
    if (state === undefined){
        return {status: null, payload: [], error: null};
    }
    if (action.type === 'SET_STATUS'){
        return {status: action.status, payload: action.payload, error: action.error};
    }
    return state;
};

export default rootReducer;