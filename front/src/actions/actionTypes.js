//Fetch all transactions
export const actionPending = () => ({type: 'SET_STATUS', status: 'PENDING', payload: [], error: null});
export const actionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED', payload, error: null});
export const actionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED', payload: null, error});
//export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';

//Create new transaction
export const newTransactionPending  = () => ({type: 'SET_STATUS', status: 'PENDING_NEW_TRANSACTION', payload: [], error: null});
export const newTransactionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED_NEW_TRANSACTION', payload, error: null});
export const newTransactionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED_NEW_TRANSACTION', payload: null, error});
//export const RESET_NEW_TRANSACTION = 'RESET_NEW_TRANSACTION';

//Remove transaction
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const REMOVE_TRANSACTION_SUCCESS = 'REMOVE_TRANSACTION_SUCCESS';
export const REMOVE_TRANSACTION_REJECTED = 'REMOVE_TRANSACTION_REJECTED';

