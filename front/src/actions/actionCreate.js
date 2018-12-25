import * as actionTypes from './actionTypes'
import actionFetch from './actionFetch'
import gql from '../store/gql'

const createTransaction = (`mutation createTransaction($title: String!, $summ: Int!, $comment: String){
    createTransaction(title: $title, summ: $summ, comment: $comment) {id}
  }`);

const actionCreate = function(transaction, date) {
    return async dispatch => {
        dispatch(actionTypes.newTransactionPending());
        await gql.request(createTransaction, transaction)
            .catch(error => dispatch(actionTypes.newTransactionRejected(error)));
        dispatch(actionFetch(date));
    };
};

export default actionCreate;