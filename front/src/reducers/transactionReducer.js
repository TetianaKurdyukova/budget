import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      
      case actionTypes.CREATE_NEW_TRANSACTION:
      return [
        ...state,
        Object.assign({}, action.transaction)
      ];
      case actionTypes.REMOVE_TRANSACTION:
      return state.filter((data, i) => i !== action.id);
      default:
            return state;
    }
  };