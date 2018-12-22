import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const editTransaction = (`mutation editTransaction($user: String!, $summ: Int!, $title: String!, $comment: String, $id: Int!){
    editTransaction(user: $user, summ: $summ, title: $title, comment: $comment id: $id) {id}
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
