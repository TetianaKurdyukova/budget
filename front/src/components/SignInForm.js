import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
    constructor() {
        super();
        
        this.state = {
            email: '',
            password: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }
    
    render(){
        return (
            <div>
                <h2>Sign In Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id='password' autoComplete='password' type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button onClick={()=>{this.props.actionSignIn(this.email.value, this.password.value)}}>Sign In</button>
                        <Link to="/sign-up-form">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;
