import * as actionTypes from './actionTypes';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });
const transactionsAll = (`query transactions{
    transactions{
        id
        summ
        user
    }
  }`);

var actionFetch = function() {
    return dispatch => {
        dispatch(actionTypes.actionPending());
        gql.request(transactionsAll)
            .then(resp => dispatch(actionTypes.actionResolved(resp.transactions)))
            .catch(error => dispatch(actionTypes.actionRejected(error)));
    };
}

export default actionFetch;