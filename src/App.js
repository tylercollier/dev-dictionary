import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Logout from './Logout';
import Login from './Login';
import Welcome from './Welcome';
import Dictionary from './Dictionary';
import TermContainer from './TermContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const loggedInUserJson = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserJson ? JSON.parse(loggedInUserJson) : null;
    this.state = {
      loggedInUser,
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
    const { loggedInUser } = this.state;

    return (
      <BrowserRouter>
        <Layout loggedInUser={loggedInUser}>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/login">
              <Login loggedInUser={loggedInUser} markUserLoggedIn={this.markUserLoggedIn} />
            </Route>
            <Route path="/logout">
              <Logout markUserLoggedOut={this.markUserLoggedOut} />
            </Route>
            <Route path="/terms/:termName" component={TermContainer} />
            <Route path="/terms">
              <Dictionary loggedInUser={loggedInUser} />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
