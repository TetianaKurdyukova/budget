import React, { Component } from 'react';
import {Provider, connect}   from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/'
import { actionFetch } from './actions/transactions'

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => console.log('subscribe', store.getState()))

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
