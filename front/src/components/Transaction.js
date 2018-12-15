import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionFetch from '../actions/actionFetch';
import actionCreate from '../actions/actionCreate';
import actionDelete from '../actions/actionDelete';
import store from '../store/configureStore';

class Transaction extends Component {
    componentDidMount() {
        store.dispatch(actionFetch());
    }
    
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            summ: this.props.summ,
            isEditing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
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
            summ: +this.state.summ
        }
        //console.log(transaction);
        this.setState({
            user: '',
            summ: 0
        });
        this.props.createTransaction(transaction);
    }
    
    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }
    
    deleteTransaction(e, id){
        e.preventDefault();
        this.props.deleteTransaction(id);
    }
    
    render() {
        const { error, payload } = this.props.root;
        
        if (this.state.isEditing) {
            return (
            <div>
              <h1>edit transaction</h1>
            </div>
            )
          }
        
        return(
            <div className="container">
                <h3>Add Transaction Form</h3>
                <form onSubmit={this.handleSubmit}>
                    <table>
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
                                        ref={(input)=>this.user = input}
                                        onChange={this.handleChange}
                                        value={this.state.user} />
                                </td>
                                <td>
                                    <input
                                        name='summ'
                                        type='number'
                                        step="0.01"
                                        onChange={this.handleChange}
                                        value={this.state.summ} />
                                </td>
                                <td>
                                    <input type="submit" value="ADD"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td>Пользователь</td>
                            <td>Сумма</td>
                            <td colSpan="2">Редактировать</td>
                        </tr>
                        {payload && payload.map(t =>
                            <tr key={t.id}>
                                <td>{t.user}</td>
                                <td>{t.summ}</td>
                                <td><button onClick={(e) => this.deleteTransaction(e, t.id)}>Удалить</button></td>
                                <td><button onClick={this.toggleEdit}>Редактировать</button></td>
                            </tr>
                        )}
                    </tbody>
              </table>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTransaction: transaction => dispatch(actionCreate(transaction)),
        //editTransaction: transaction => dispatch(actionEdit(transaction)),
        deleteTransaction: id => dispatch(actionDelete(id))
    }
};

Transaction = connect(s => s)(Transaction);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
