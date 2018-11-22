import React, { Component } from 'react';
import {Provider, connect}   from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import { GraphQLClient } from 'graphql-request';

const gql = new GraphQLClient("http://localhost:8000/graphql", { headers: {} });
const transactionsAll = (`query transactions{
    transactions{
          id
          user
          date
          summ
        }
      }`);

let rootReducer = (state, action) => {
    if (state === undefined){
        return {status: null, payload: [], error: null};
    }
    if (action.type === 'SET_STATUS'){
        return {status: action.status, payload: action.payload, error: action.error};
    }
    return state;
};

const reducers = combineReducers ({
    root: rootReducer
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => console.log('subscribe', store.getState()))

const actionPending = () => ({type: 'SET_STATUS', status: 'PENDING', payload: [], error: null});
const actionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED', payload, error: null});
const actionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED', payload: null, error});

function actionFetch() {
    return dispatch => {
        dispatch(actionPending());
        gql.request(transactionsAll)
                .then(resp => dispatch(actionResolved(resp.transactions)))
                .catch(error => dispatch(actionRejected(error)));
    };
}

class MainBlock extends Component {
    componentDidMount() {
        store.dispatch(actionFetch());
    }

    render() {
        const { error, payload, status } = this.props.root;
            console.log('status: ' + status + ', payload: ' + payload)
        return (

            <ul>
            {payload.map(t =>
                <li key={t.id}>{t.user}, {t.summ}</li>
            )}
            </ul>
        );
    }
};

MainBlock = connect(s => s)(MainBlock);

class App extends Component {
  render() {
    return (
        <Provider store = {store} >
            <MainBlock />
        </Provider>
    );
  }
}

export default App;
