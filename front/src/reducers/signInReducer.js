let signInReducer = (state, action) =>{
        if(state === undefined){
            return {state: null};
  }
  if(action.type ==='SIGNIN'){
        return {status: action.status, payload: action.payload, error: action.error};
  }
    return state;
};

export default signInReducer;