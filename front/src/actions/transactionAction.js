import * as actionTypes from './actionTypes'

export const createTransaction = (transaction) => {
    return {
      type: actionTypes.newTransactionResolved,
      transaction: transaction
    }
};

export const deleteTransaction = (id) => {
    return {
        type: actionTypes.REMOVE_TRANSACTION,
        id: id
    }
}

