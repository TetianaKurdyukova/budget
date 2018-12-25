import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Main from '../components/Main';
import Transaction from '../components/Transaction';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import NotFound from '../components/NotFound';

class Routing extends Component{
  render(){
    return(
        <Router history = {createHistory()}>
            <div>
                <Route path="/" component={ Main } exact />             
                <Route path="/transaction" component={ Transaction } />
                <Route path="/sign-in-form" component={ SignInForm } />
                <Route path="/sign-up-form" component={ SignUpForm } />
                <Route path="/not-found" component = { NotFound } />
            </div>
        </Router>
    );
  }
};

export default Routing;