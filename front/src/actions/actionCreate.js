import * as actionTypes from './actionTypes'
import actionFetch from './actionFetch'
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const createTransaction = (`mutation createTransaction($user: String!, $summ: Int!){
    createTransaction(user: $user, summ: $summ) {id}
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