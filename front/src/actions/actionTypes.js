//Fetch all transactions
export const actionPending = () => ({type: 'SET_STATUS', status: 'PENDING', payload: [], error: null});
export const actionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED', payload, error: null});
export const actionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED', payload: null, error});

//Create new transaction
export const newTransactionPending  = () => ({type: 'SET_STATUS', status: 'PENDING_NEW_TRANSACTION', payload: [], error: null});
export const newTransactionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED_NEW_TRANSACTION', payload, error: null});
export const newTransactionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED_NEW_TRANSACTION', payload: null, error});

//Edit transaction
export const editTransactionPending  = () => ({type: 'SET_STATUS', status: 'PENDING_EDIT_TRANSACTION', payload: [], error: null});
export const editTransactionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED_EDIT_TRANSACTION', payload, error: null});
export const editTransactionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED_EDIT_TRANSACTION', payload: null, error});

//Remove transaction
export const deleteTransactionPending  = () => ({type: 'SET_STATUS', status: 'PENDING_DELETE_TRANSACTION', payload: [], error: null});
export const deleteTransactionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED_DELETE_TRANSACTION', payload, error: null});
export const deleteTransactionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED_DELETE_TRANSACTION', payload: null, error});

