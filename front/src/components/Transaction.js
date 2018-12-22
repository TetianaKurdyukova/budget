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
            title: this.props.title,
            summ: this.props.summ,
            user: this.props.user,
            comment: this.props.comment,
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
            title: this.state.title,
            summ: +this.state.summ,
            user: this.state.user,
            comment: this.state.comment
        }
        this.setState({
            title: '',
            summ: 0,
            user: '',
            comment: ''
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
            title: editInfo.title,
            summ: editInfo.summ,
            user: editInfo.user,
            comment: editInfo.comment,
            create: false
        });
    };
    
    handleUpdate = () => {
        const updatedTransaction = {
            id: this.state.id,
            title: this.state.title,
            summ: +this.state.summ,
            user: this.state.user,
            comment: this.state.comment,
        };

        this.setState({
            title: '',
            summ: 0,
            user: '',
            comment: '',
            create: true
        });
        this.props.editTransaction(updatedTransaction);
    }

    handleDelete(e, id){
        e.preventDefault();
        this.props.deleteTransaction(id);
        this.setState({
            title: this.state.title,
            summ: this.state.summ,
            user: this.state.user,
            comment: this.state.comment,
            create: false
        });
    }
    
    render() {
        const { error, payload } = this.props.root;
        const create = this.state.create ? 'Сохранить' : 'Обновить';
        const inputIsEmpty = 
            this.state.title === '' || this.state.summ === '' || this.state.user === '' || this.state.comment === '' ? true : false;
        
        return(
            <div className="container">
                <h3>Add Transaction Form</h3>
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        name='title'
                                        type='text'
                                        placeholder="Enter Title"
                                        onChange={this.handleChange}
                                        value={this.state.title} />
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
                                    <input
                                        name='user'
                                        type='text'
                                        placeholder="Enter User"
                                        onChange={this.handleChange}
                                        value={this.state.user} />
                                </td>
                                <td>
                                    <input
                                        name='comment'
                                        type='text'
                                        placeholder="Enter Comment"
                                        onChange={this.handleChange}
                                        value={this.state.comment} />
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
                            <th>Наименование</th>
                            <th>Сумма</th>
                            <th>Пользователь</th>
                            <th>Комментарий</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                        {payload && payload.map(t =>
                            <tr key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.summ}</td>
                                <td>{t.user}</td>
                                <td>{t.comment}</td>
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
    }
};

Transaction = connect(s => s)(Transaction);

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
