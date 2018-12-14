import * as actionTypes from './actionTypes';
import actionFetch from './actionFetch';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });

const deleteTransaction = (`mutation deleteTransaction($id: Int!){
    deleteTransaction(id: $id){id}
  }`);


const actionDelete = function(id) {
    return async dispatch => {
    	//debugger;
        dispatch(actionTypes.deleteTransactionPending());
        await gql.request(deleteTransaction, {id})
            //.then(resp => dispatch(actionTypes.actionPending))
            .catch(error => dispatch(actionTypes.deleteTransactionRejected(error)));
        dispatch(actionFetch());
    };
};

export default actionDelete;
