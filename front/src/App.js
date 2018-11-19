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

let feedReducer = (state, action) => {
    if (state === undefined) {
        return {state: 'Empty state'};
    }
    if (action.type === 'SET_STATUS') {
        return {status: action.status, payload: action.payload, error:action.error};
    }
    return state;
};

const reducers = combineReducers ({
    feed: feedReducer
});
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

//console.log(store);

const actionPending = () => ({type: 'SET_STATUS', status: 'PENDING', payload: null, error: null});
const actionResolved = payload => ({type: 'SET_STATUS', status: 'RESOLVED', payload, error: null});
const actionRejected = error => ({type: 'SET_STATUS', status: 'REJECTED', payload: null, error});

function actionFetch() {
    return (async function (dispatch) {
        dispatch(actionPending());
        try {
            dispatch(actionResolved((await gql.request(transactionsAll)
            .then(data => (console.log(data), data))).transactionLog
            ));
        }
        catch (e) {
            dispatch(actionRejected(e));
        };
    });
}

store.dispatch(actionFetch());
store.subscribe(() => console.log('subscribe', store.getState()));

let mapStateToProps = state => ({feed: state.feed});
let mapDispatchToProps = actionFetch();

class MainBlock extends Component {
    render() {
        console.log('mainBlock', this.props);
        if (this.props.feed.status === 'PENDING') {
            return (
                <p>Data is loading</p>
            );
        }
        else if (this.props.feed.status === 'REJECTED') {
            return (
                <p>Error</p>
            );
        }
        else if (this.props.feed.status === 'RESOLVED') {
            return (
                <div className='MainBlock'>
                    {this.props.feed.payload.map(transactionLog => <transactionLog transactionLog = {transactionLog} />)}
                    <button></button>
                </div>
            );
        }
    }
};

MainBlock = connect(mapStateToProps)(MainBlock);

class Post extends Component {
    render() {
        console.log('post', this.props);
        return (
            <div className='Post'>
                <div className='Article'>
                    
                    
                </div>
            </div>
        );
    };
};





class App extends Component {
  render() {
    return (
        <div>
            
            <Post />
        </div>
    );
  }
}

export default App;
