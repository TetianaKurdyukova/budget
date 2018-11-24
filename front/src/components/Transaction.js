import React, { Component } from 'react';
//import * as actionTypes from '../actions/actionTypes';
import * as transactionAction from '../actions/transactionAction';
import {connect}   from 'react-redux';
import { actionFetch } from '../actions/actionTypes';
import store from '../store/configureStore';

class Transaction extends Component {
    componentDidMount() {
        store.dispatch(actionFetch());
    }

    constructor(props){
        super(props);
        this.state = {
            user: '',
            summ: ''
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      handleChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

      handleSubmit(e){
        e.preventDefault();
        let transaction = {
            user: this.state.user,
            summ: this.state.summ
        }
        this.setState({
            user: '',
            summ: ''
        });
        this.props.createTransaction(transaction);
    }
    
    
    listView(data, index){
        return (
            <tr key={index}>
                <td>{data.user}</td>
                <td>{data.summ}</td>
                <td><button onClick={(e) => this.deleteTransaction(e, index)}>Удалить</button></td>
            </tr>
        )
    }
    
    deleteTransaction(e, index){
        e.preventDefault();
        this.props.deleteTransaction(index);
    }
    
    render() {
        const { error, payload } = this.props.root;
        return(
            <div className="container">
                <h3>Add Transaction Form</h3>
                <form onSubmit={this.handleSubmit}>
                    <table className='table1'>
                        <tbody>
                            <tr>
                                <td>Пользователь</td>
                                <td>Сумма</td>
                                <td>Редактировать</td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        name='user'
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.user} />
                                </td>
                                <td>
                                    <input
                                        name='summ'
                                        type='text'
                                        onChange={this.handleChange}
                                        value={this.state.summ} />
                                </td>
                                <td>
                                    <input type="submit" className="btn btn-success" value="ADD"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr />
              { <table className="list-group">
                    <tr>
                        <td>Пользователь</td>
                        <td>Сумма</td>
                        <td>Редактировать</td>
                    </tr>
                    {payload.map(t =>
                        <tr key={t.id}>
                            <td>{t.user}</td>
                            <td>{t.summ}</td>
                        </tr>
                    )}
                    {this.props.transactions.map((transaction, i) => this.listView(transaction, i))}
              </table> }
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

Transaction = connect(s => s)(Transaction);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);