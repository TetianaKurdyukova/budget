import * as actionTypes from './actionTypes'
import actionFetch from './actionFetch'
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const createTransaction = (`mutation createTransaction($title: String!, $summ: Int!, $user: String!, $comment: String){
    createTransaction(title: $title, summ: $summ, user: $user, comment: $comment) {id}
  }`);

const actionCreate = function(transaction) {
    return async dispatch => {
        dispatch(actionTypes.newTransactionPending());
        await gql.request(createTransaction, transaction)
            .catch(error => dispatch(actionTypes.newTransactionRejected(error)));
        dispatch(actionFetch());
    };
};

export default actionCreate;