import React, { Component } from 'react';
import createHistory from "history/createBrowserHistory";
import Routing from './router/router';

class App extends Component {
  render() {
    return (
        <Routing />
    );
  }
}

export default App;
