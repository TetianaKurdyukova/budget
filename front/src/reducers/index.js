import { combineReducers } from 'redux';
import rootReducer from './rootReducer';
import transactions from './transactionReducer';
import createUserReducer from './userReducer';
import signInReducer from './signInReducer';

const reducers = combineReducers ({
    root: rootReducer,
    transactions: transactions,
    userCreate: createUserReducer,
    signInReducer: signInReducer
});
export default reducers;