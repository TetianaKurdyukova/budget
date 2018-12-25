import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import gql from '../store/gql';

const deleteTransaction = (`mutation deleteTransaction($id: Int!){
    deleteTransaction(id: $id){id}
  }`);

const actionDelete = function(id, date) {
    return async dispatch => {
        dispatch(actionTypes.deleteTransactionPending());
        await gql.request(deleteTransaction, {id})
            .catch(error => dispatch(actionTypes.deleteTransactionRejected(error)));
        dispatch(actionFetch(date));
    };
};

export default actionDelete;
