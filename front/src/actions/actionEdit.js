import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const editTransaction = (`mutation editTransaction($user: String!, $summ: Int!, $id: Int!){
    editTransaction(user: $user, summ: $summ, id: $id) {id}
  }`);


const actionEdit = function(transaction) {
    return async dispatch => {
    	//debugger;
        dispatch(actionTypes.editTransactionPending());
        await gql.request(editTransaction, transaction)
            .catch(error => dispatch(actionTypes.editTransactionRejected(error)));
        dispatch(actionFetch());
    };
};

export default actionEdit;
