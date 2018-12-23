import * as actionTypes from './actionTypes';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });
const queryTransactionsByDate = (`query transactionsByDate($date: String!){
    transactionsByDate(date: $date){
        id
        summ
        user
        title
        comment
    }
  }`);

var actionFetch = function(date) {
    return dispatch => {
        dispatch(actionTypes.actionPending());
        gql.request(queryTransactionsByDate, {date})
            .then(resp => dispatch(actionTypes.actionResolved(resp.transactionsByDate)))
            .catch(error => dispatch(actionTypes.actionRejected(error)));
    };
};

export default actionFetch;