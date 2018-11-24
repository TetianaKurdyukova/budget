import * as actionTypes from './Transaction'

export const createTransaction = (transaction) => {
    return {
      type: actionTypes.CREATE_NEW_TRANSACTION,
      transaction: transaction
    }
};

