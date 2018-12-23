import { combineReducers } from 'redux';
import rootReducer from './rootReducer';
import transactions from './transactionReducer';
import createUserReducer from './userReducer'

const reducers = combineReducers ({
    root: rootReducer,
    transactions: transactions,
    userCreate: createUserReducer
});
export default reducers;