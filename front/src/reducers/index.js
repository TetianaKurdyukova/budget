import { combineReducers } from 'redux';
import rootReducer from './rootReducer';
import transactions from './transactionReducer'

const reducers = combineReducers ({
    root: rootReducer,
    transactions: transactions
});
export default reducers;