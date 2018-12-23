let createUserReducer = (state, action) =>{
    if(state === undefined){
        return {state: null};
  }
  if(action.type ==='CREATE_USER'){
    return {status: action.status, payload: action.payload, error: action.error};
  }
    return state;
};

export default createUserReducer;