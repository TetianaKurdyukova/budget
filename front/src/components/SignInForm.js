import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionSignIn from '../actions/actionSignIn';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        };
            this.setState({
            email: '',
            password: ''
        });
        this.props.signIn(user.email, user.password);
    }
    
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign In Form</h2>
                    <div className='form-group'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            className='form-control'
                            id='email'
                            name='email'
                            type='email'
                            placeholder="Enter Email"
                            ref={(input)=>this.email = input}
                            onChange={this.handleChange}
                            value={this.state.email} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password: </label>
                        <input
                            className='form-control'
                            id='password'
                            name='password'
                            type='password'
                            placeholder="Enter Password"
                            autoComplete='password'
                            ref={(input)=>this.password = input}
                            onChange={this.handleChange}
                            value={this.state.password} />
                    </div>
                    <div>
                        <button className='btn btn-primary' onSubmit={this.handleSubmit}>Sign In</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, {signIn: actionSignIn})(SignInForm);
