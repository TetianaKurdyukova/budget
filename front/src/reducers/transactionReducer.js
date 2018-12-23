import * as actionTypes from '../actions/actionTypes'

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.newTransactionResolved:
      return [
        ...state,
        Object.assign({}, action.transaction)
      ];
      
        case actionTypes.editTransactionResolved:
        return [
            ...state.filter(transaction => transaction.id !== action.transaction.id),
            Object.assign({}, action.transaction)
        ];
      
      
      case actionTypes.deleteTransactionResolved:
      return state.filter((data, i) => i !== action.id);
      default:
            return state;
    }
  };