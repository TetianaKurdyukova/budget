import React, { Component } from 'react';
import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import Transaction from '../components/Transaction';
import EditForm from '../components/EditForm';
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
                      <Link to="/edit">Edit</Link>
                    </li>
                </ul>
                <Switch>
                  <Route path="/" component={ Transaction } exact />             
                  <Route path="/edit" component={ EditForm } />
                  <Route component = { NotFound } />
                </Switch>
            </div>
        </Router>
    )
  }
}

export default Routing;