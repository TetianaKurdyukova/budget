import * as actionTypes from './actionTypes';
import gql from '../store/gql';

const queryTransactionsByDate = (`query transactionsByDate($date: String!){
    transactionsByDate(date: $date){
        id
        summ
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