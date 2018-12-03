import * as actionTypes from './actionTypes';

const actionDelete = (id) => {
    return {
        type: actionTypes.REMOVE_TRANSACTION,
        id: id
    }
}

export default actionDelete();