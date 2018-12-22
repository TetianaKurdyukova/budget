import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionFetch from '../actions/actionFetch';
import actionCreate from '../actions/actionCreate';
import actionEdit from '../actions/actionEdit';
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
            create: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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
        this.setState({
            user: '',
            summ: 0
        });
        this.props.createTransaction(transaction);
    }
    
    handleEdit = (e, id) => {
        e.preventDefault();
        //debugger;
        const editInfo = this.props.root.payload.find(function(t) {
            if (t.id === id) {
                return t;
            }
        })
        
        this.setState({
            id: editInfo.id,
            user: editInfo.user,
            summ: editInfo.summ,
            create: false
        });
    };
    
    handleUpdate = () => {
        const updatedTransaction = {
            id: this.state.id,
            user: this.state.user,
            summ: +this.state.summ
        };

        this.setState({
            user: '',
            summ: 0,
            create: true
        });
        this.props.editTransaction(updatedTransaction);
    }

    handleDelete(e, id){
        e.preventDefault();
        this.props.deleteTransaction(id);
        this.setState({
            user: this.state.user,
            summ: this.state.summ,
            create: false
        });
    }
    
    render() {
        const { error, payload } = this.props.root;
        const create = this.state.create ? 'Сохранить' : 'Обновить';
        const inputIsEmpty = 
            this.state.user === '' || this.state.summ === '' ? true : false;
        
        return(
            <div className="container">
                <h3>Add Transaction Form</h3>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        name='user'
                                        type='text'
                                        placeholder="Enter User"
                                        onChange={this.handleChange}
                                        value={this.state.user} />
                                </td>
                                <td>
                                    <input
                                        name='summ'
                                        type='number'
                                        step="0.01"
                                        placeholder="Enter Summ"
                                        onChange={this.handleChange}
                                        value={this.state.summ} />
                                </td>
                                <td>
                                    <button
                                    disabled={inputIsEmpty}
                                    onClick={
                                      this.state.create
                                        ? this.handleSubmit
                                        : this.handleUpdate
                                    }
                                    >
                                    { create }
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <th>Пользователь</th>
                            <th>Сумма</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                        {payload && payload.map(t =>
                            <tr key={t.id}>
                                <td>{t.user}</td>
                                <td>{t.summ}</td>
                                <td><button onClick={(e) => this.handleEdit(e, t.id)}>Редактировать</button></td>
                                <td><button onClick={(e) => this.handleDelete(e, t.id)}>Удалить</button></td>
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
        editTransaction: (id, transaction) => dispatch(actionEdit(id, transaction)),
        deleteTransaction: id => dispatch(actionDelete(id))
    };
};

Transaction = connect(s => s)(Transaction);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
