import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

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
