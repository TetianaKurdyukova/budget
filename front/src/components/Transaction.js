import React, { Component } from 'react';
import * as actionTypes from './Transaction'
//import store from '../store/configureStore';

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
        console.log(this.state.user);
    }
    
    render() {
        let user;
        return(
          <div>
              <h3>Add Transaction Form</h3>
              <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" />
              </form>
          </div>
        )
    }
};

export default Transaction;