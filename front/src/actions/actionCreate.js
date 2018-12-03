import * as actionTypes from './actionTypes'
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const createTransaction = (`mutation createTransaction($user: String!, $summ: Int!){
    createTransaction(user: $user, summ: $summ) {id}
  }`);

const actionCreate = function(transaction) {
    return dispatch => {
        dispatch(actionTypes.newTransactionPending());
        gql.request(createTransaction, transaction)
            .then(resp => dispatch(actionTypes.actionPending))
            .catch(error => dispatch(actionTypes.newTransactionRejected(error)));
    };
};

export default actionCreate;