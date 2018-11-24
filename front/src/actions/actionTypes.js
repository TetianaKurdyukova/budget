import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });
const transactionsAll = (`query transactions{
    transactions{
          id
          user
          date
          summ
        }
      }`);

const actionPending = () => ({type: 'SET_STATUS', status: 'PENDING', payload: [], error: null});
const actionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED', payload, error: null});
const actionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED', payload: null, error});

export function actionFetch() {
    return dispatch => {
        dispatch(actionPending());
        gql.request(transactionsAll)
                .then(resp => dispatch(actionResolved(resp.transactions)))
                .catch(error => dispatch(actionRejected(error)));
    };
}

export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';
export const CREATE_NEW_TRANSACTION = 'CREATE_NEW_TRANSACTION';
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';