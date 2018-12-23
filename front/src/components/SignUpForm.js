import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionCreateUser from '../actions/actionCreateUser';
import store from '../store/configureStore';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            phone: this.props.tphone,
            email: this.props.email,
            password: this.props.password
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
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password
        };
        console.log(this.state);
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: ''
        });
        this.props.createUser(user);
    }
    
    render(){
        return (
            <div>
                <h2>Sign Up Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name: </label>
                        <input
                            name='firstName'
                            type='text'
                            placeholder="Enter FirstName"
                            ref={(input)=>this.firstName = input}
                            onChange={this.handleChange}
                            value={this.state.firstName} />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input
                            name='lastName'
                            type='text'
                            placeholder="Enter LastName"
                            ref={(input)=>this.lastName = input}
                            onChange={this.handleChange}
                            value={this.state.lastName} />
                    </div>
                    <div>
                        <label>Phone Number: </label>
                        <input
                            name='phone'
                            type='tel'
                            placeholder="Enter Phone Number"
                            ref={(input)=>this.phone = input}
                            onChange={this.handleChange}
                            value={this.state.phone} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input
                            name='email'
                            type='email'
                            placeholder="Enter Email"
                            ref={(input)=>this.email = input}
                            onChange={this.handleChange}
                            value={this.state.email} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            name='password'
                            type='password'
                            placeholder="Enter Password"
                            ref={(input)=>this.password = input}
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </div>
                    <div>
                        <button onSubmit={this.handleSubmit}>Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: user => dispatch(actionCreateUser(user))
    };
};

SignUpForm = connect(s => s)(SignUpForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
