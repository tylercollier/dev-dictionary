import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Login from './Login';
import Welcome from './Welcome';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Welcome} />
          <Route path="login" component={Login} />
        </Route>
      </Router>
    );
  }
}

export default App;
