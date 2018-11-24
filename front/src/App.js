import React, { Component } from 'react';
import {connect}   from 'react-redux';
import { actionFetch } from './actions/transactions'
import store from './store/configureStore'

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
        <MainBlock />
    );
  }
}

export default App;
