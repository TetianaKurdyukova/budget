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
    
    listView(data, index){
        return (
          <div className="row">
            <div className="col-md-10">
              <li key={index} className="list-group-item clearfix">
                {data.user}
              </li>
            </div>
            <div className="col-md-2">
              <button onClick={(e) => this.deleteTransaction(e, index)} className="btn btn-danger">
                Remove
              </button>
            </div>
        </div> 
        )
    }
    deleteTransaction(e, index){
        e.preventDefault();
        this.props.deleteTransaction(index);
    }
    
    render() {
        return(
            <div className="container">
              <h1>Clientside Transactions Application</h1>
              <div>
                <h3>Add Transaction Form</h3>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" onChange={this.handleChange} className="form-control" value={this.state.user}/><br />
                  <input type="submit" className="btn btn-success" value="ADD"/>
                </form>
                <hr />
              { <ul className="list-group">
                {this.props.transactions.map((transaction, i) => this.listView(transaction, i))}
              </ul> }
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
    createTransaction: transaction => dispatch(transactionAction.createTransaction(transaction)),
    deleteTransaction: index =>dispatch(transactionAction.deleteTransaction(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);