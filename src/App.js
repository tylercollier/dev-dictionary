import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Login from './Login';
import Welcome from './Welcome';
import './App.css';

class App extends Component {
  static childContextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  state = {
    loggedInUser: null,
  }

  getChildContext() {
    return {
      loggedInUser: this.state.loggedInUser,
    };
  }

  markUserLoggedIn = user => {
    this.setState({ loggedInUser: user })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Welcome} />
          <Route path="login" component={props => <Login { ...props} markUserLoggedIn={this.markUserLoggedIn} />} />
        </Route>
      </Router>
    );
  }
}

export default App;
