import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Dev Dictionary</h1>
        <p>Instructions are in the README doc</p>
        <p>View <Link to="/terms">list of terms</Link></p>
      </div>
    );
  }
}

export default Welcome;
