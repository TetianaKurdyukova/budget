import React, { Component } from 'react';
import * as actionTypes from '../actions/actionTypes';
import * as transactionAction from '../actions/transactionAction';
import {connect}   from 'react-redux';

class Transaction extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          user: ''
        }
    }

      handleChange(e){
        this.setState({
          user: e.target.value
        })
    }

      handleSubmit(e){
        e.preventDefault();
        let transaction = {
            user: this.state.user
        }
        this.setState({
            user: ''
        });
        this.props.createTransaction(transaction);
    }
    
    render() {

    return(
      <div>
        <h1>Clientside Transactions Application</h1>
        <hr />
        { <ul>
          {this.props.transactions.map((transaction, i) => <li key={i}>{transaction.user}</li> )}
        </ul> }
        <div>
          <h3>Add Transaction Form</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTransaction: transaction => dispatch(transactionAction.createTransaction(transaction))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);