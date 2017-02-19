import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import Layout from './Layout';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Layout} />
    );
  }
}

export default App;
