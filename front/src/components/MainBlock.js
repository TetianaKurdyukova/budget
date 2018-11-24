import React, { Component } from 'react';
import {connect}   from 'react-redux';
import { actionFetch } from '../actions/actionTypes';
import store from '../store/configureStore';
import Transaction from './Transaction'

class MainBlock extends Component {
    componentDidMount() {
        store.dispatch(actionFetch());
    }

    render() {
        const { error, payload } = this.props.root;
        return (
            <div>
                <Transaction />
                <ul>
                {payload.map(t =>
                    <li key={t.id}>{t.user}, {t.summ}</li>
                )}
                </ul>
            </div>
        );
    }
};
MainBlock = connect(s => s)(MainBlock);

export default MainBlock;