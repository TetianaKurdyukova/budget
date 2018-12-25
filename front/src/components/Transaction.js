import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionFetch from '../actions/actionFetch';
import actionCreate from '../actions/actionCreate';
import actionEdit from '../actions/actionEdit';
import actionDelete from '../actions/actionDelete';
import Calendar from 'react-calendar';
import store from '../store/configureStore';

class Transaction extends Component {
    componentDidMount() {
        store.dispatch(actionFetch(this.state.date));
    }
    
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            summ: this.props.summ,
            comment: this.props.comment,
            date: new Date(),
            create: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }
   
    onDateChange(date) {
        this.setState({
            date
        });
        this.props.fetchTransactions(date);
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
            title: this.state.title,
            summ: +this.state.summ,
            comment: this.state.comment
        };
        this.setState({
            title: '',
            summ: 0,
            comment: ''
        });
        this.props.createTransaction(transaction, this.state.date);
    }
    
    handleEdit = (e, id) => {
        e.preventDefault();
        const editInfo = this.props.root.payload.find(function(t) {
            if (t.id === id) {
                return t;
            }
        });
        this.setState({
            id: editInfo.id,
            title: editInfo.title,
            summ: editInfo.summ,
            comment: editInfo.comment,
            create: false
        });
    };
    
    handleUpdate = () => {
        const updatedTransaction = {
            id: this.state.id,
            title: this.state.title,
            summ: +this.state.summ,
            comment: this.state.comment
        };

        this.setState({
            title: '',
            summ: 0,
            comment: '',
            create: true
        });
        this.props.editTransaction(updatedTransaction, this.state.date);
    }

    handleDelete(e, id){
        e.preventDefault();
        this.props.deleteTransaction(id, this.state.date);
        this.setState({
            title: this.state.title,
            summ: this.state.summ,
            comment: this.state.comment,
            create: false
        });
    }
    
    render() {
        const { error, payload } = this.props.root;
        const create = this.state.create ? 'Сохранить' : 'Обновить';
        const inputIsEmpty = 
            this.state.title === '' || this.state.summ === '' || this.state.comment === '' ? true : false;
    
        var total = 0;
        payload.forEach(function(t) {
            total+=t.summ;
        });
        
        return(
            <div className="container">
                <Calendar
                    calendarType='ISO 8601'
                    onChange={this.onDateChange}
                    value={this.state.date}
                />
    
                <h3>Добавить транзакции</h3>
                <form onSubmit={this.handleSubmit}>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        name='title'
                                        type='text'
                                        placeholder="Наименование"
                                        onChange={this.handleChange}
                                        value={this.state.title} />
                                </td>
                                <td>
                                    <input
                                        name='summ'
                                        type='number'
                                        step="0.01"
                                        placeholder="Сумма"
                                        onChange={this.handleChange}
                                        value={this.state.summ} />
                                </td>
                                <td>
                                    <input
                                        name='comment'
                                        type='text'
                                        placeholder="Комментарий"
                                        onChange={this.handleChange}
                                        value={this.state.comment} />
                                </td>
                                <td>
                                    <button
                                        className='btn btn-primary'
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
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">Наименование</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Комментарий</th>
                            <th scope="col">Редактировать</th>
                            <th scope="col">Удалить</th>
                        </tr>
                    </thead>
                        
                    <tbody>  
                        {payload && payload.map(t =>
                            <tr key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.summ}</td>
                                <td>{t.comment}</td>
                                <td><button className='btn btn-primary' onClick={(e) => this.handleEdit(e, t.id)}>Редактировать</button></td>
                                <td><button className='btn btn-primary' onClick={(e) => this.handleDelete(e, t.id)}>Удалить</button></td>
                            </tr>
                        )}
                        <tr>
                            <td><strong>Итого:</strong></td>
                            <td><strong>{total}</strong></td>
                            <td colSpan='3'></td>
                        </tr>
                    </tbody>
              </table>
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTransaction: (transaction, date) => dispatch(actionCreate(transaction, date)),
        editTransaction: (id, transaction, date) => dispatch(actionEdit(id, transaction, date)),
        deleteTransaction: (id, date) => dispatch(actionDelete(id, date)),
        fetchTransactions: date => dispatch(actionFetch(date))
    };
};

Transaction = connect(s => s)(Transaction);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
