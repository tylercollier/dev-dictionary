import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './Layout';
import Logout from './Logout';
import Login from './Login';
import Welcome from './Welcome';
import Terms from './Terms';
import TermContainer from './TermContainer';
import './App.css';

class App extends Component {
  static childContextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  constructor() {
    super();
    const loggedInUserJson = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserJson ? JSON.parse(loggedInUserJson) : null;
    this.state = {
      loggedInUser,
    };
  }

  getChildContext() {
    return {
      loggedInUser: this.state.loggedInUser,
    };
  }

  markUserLoggedIn = user => {
    this.setState({ loggedInUser: user });
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  markUserLoggedOut = () => {
    this.setState({ loggedInUser: null });
    localStorage.setItem('loggedInUser', null);
  };

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Welcome} />
          <Route path="login" component={props => <Login { ...props} markUserLoggedIn={this.markUserLoggedIn} />} />
          <Route path="logout" component={props => <Logout { ...props} markUserLoggedOut={this.markUserLoggedOut} />} />
          <Route path="terms">
            <IndexRoute component={Terms} />
            <Route path=":termName" component={TermContainer} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
