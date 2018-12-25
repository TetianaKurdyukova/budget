import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import gql from '../store/gql';

const editTransaction = (`mutation editTransaction($summ: Int!, $title: String!, $comment: String, $id: Int!){
    editTransaction(summ: $summ, title: $title, comment: $comment id: $id) {id}
  }`);

const actionEdit = function(transaction, date) {
    return async dispatch => {
    	//debugger;
        dispatch(actionTypes.editTransactionPending());
        await gql.request(editTransaction, transaction)
            .catch(error => dispatch(actionTypes.editTransactionRejected(error)));
        dispatch(actionFetch(date));
    };
};

export default actionEdit;
