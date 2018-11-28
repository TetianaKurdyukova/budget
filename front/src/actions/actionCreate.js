import * as actionTypes from './actionTypes'
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const createTransaction = (`mutation createTransaction($user: String!, $summ: Int!){
    createTransaction(user: $user, summ: $summ) {id}
  }`);

const actionCreate = function() {
    return dispatch => {
        dispatch(actionTypes.newTransactionPending());
        gql.request(createTransaction)
            .then(resp => dispatch(actionTypes.newTransactionResolved(resp.createTransaction)))
            .catch(error => dispatch(actionTypes.newTransactionRejected(error)));
    };
};

export default actionCreate;