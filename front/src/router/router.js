import React, { Component } from 'react';
import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Transaction from '../components/Transaction';
import SignUpForm from '../components/SignUpForm';
import NotFound from '../components/NotFound';

class Routing extends Component{
  render(){
    return(
        <Router history = {createHistory()}>
            <div>
                <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/not-found">Not Found</Link>
                    </li>
                    <li>
                      <Link to="/sign-up-form">Sign Up</Link>
                    </li>
                </ul>
                <Switch>
                  <Route path="/" component={ Transaction } exact />             
                  <Route path="/sign-up-form" component={ SignUpForm } />
                  <Route path="/not-found" component = { NotFound } />
                </Switch>
            </div>
        </Router>
    );
  }
};

export default Routing;