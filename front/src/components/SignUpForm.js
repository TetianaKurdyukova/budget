import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionCreateUser from '../actions/actionCreateUser';

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
            <div className='container'>
                <h2>Sign Up Form</h2>
                <form className='main-form' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>First Name: </label>
                        <input
                            className='form-control'
                            name='firstName'
                            type='text'
                            placeholder="Enter FirstName"
                            ref={(input)=>this.firstName = input}
                            onChange={this.handleChange}
                            value={this.state.firstName} />
                    </div>
                    <div className='form-group'>
                        <label>Last Name: </label>
                        <input
                            className='form-control'
                            name='lastName'
                            type='text'
                            placeholder="Enter LastName"
                            ref={(input)=>this.lastName = input}
                            onChange={this.handleChange}
                            value={this.state.lastName} />
                    </div>
                    <div className='form-group'>
                        <label>Phone Number: </label>
                        <input
                            className='form-control'
                            name='phone'
                            type='tel'
                            placeholder="Enter Phone Number"
                            ref={(input)=>this.phone = input}
                            onChange={this.handleChange}
                            value={this.state.phone} />
                    </div>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input
                            className='form-control'
                            name='email'
                            type='email'
                            placeholder="Enter Email"
                            ref={(input)=>this.email = input}
                            onChange={this.handleChange}
                            value={this.state.email} />
                    </div>
                    <div className='form-group'>
                        <label>Password: </label>
                        <input
                            className='form-control'
                            name='password'
                            type='password'
                            autoComplete='password'
                            placeholder="Enter Password"
                            ref={(input)=>this.password = input}
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-primary' onSubmit={this.handleSubmit}>Sign Up</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
