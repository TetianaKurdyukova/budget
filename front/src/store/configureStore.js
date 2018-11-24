import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
//store.subscribe(() => console.log('subscribe', store.getState()));

export default store;