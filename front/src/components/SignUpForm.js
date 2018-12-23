import React, { Component } from 'react';

class SignUpForm extends Component {
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
                <h2>Sign Up Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name: </label>
                        <input id="first-name" type="text" placeholder="Enter your first name" value={this.state.firstName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name: </label>
                        <input id="last-name" type="text" placeholder="Enter your last name" value={this.state.lastName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone Number: </label>
                        <input id="phone" type="tel" placeholder="Enter your phone number" value={this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input id="email" type="email" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id='password' autoComplete='password' type="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <button>Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
