import * as actionTypes from './actionTypes'

export const createTransaction = (transaction) => {
    return {
      type: actionTypes.CREATE_NEW_TRANSACTION,
      transaction: transaction,
      date: new Date()
    }
};

export const deleteTransaction = (id) => {
    return {
        type: actionTypes.REMOVE_TRANSACTION,
        id: id
    }
}

