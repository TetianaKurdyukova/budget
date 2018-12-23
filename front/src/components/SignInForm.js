import React, { Component } from 'react';
import {connect}   from 'react-redux';
import actionSignIn from '../actions/actionSignIn';
import store from '../store/configureStore';

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
        console.log('you are signed in');
        this.setState({
            email: '',
            password: ''
        });
        console.log(this.props);
        console.log(this.props.signIn);
        this.props.signIn(user);
        
    }
    
    render() {
        return (
            <div>
                <h2>Sign In Form</h2>
                <form onSubmit={this.handleSubmit}>
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
                        <button onSubmit={this.handleSubmit}>Sign In</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(actionSignIn(email, password))
    };
};

SignInForm = connect(s => s)(SignInForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
