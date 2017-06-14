import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {
  static propTypes = {
    markUserLoggedOut: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.markUserLoggedOut();
  }

  render() {
    return (
      <div>
        <p>You have been <strong>logged out</strong></p>

        <p><Link to="/login">Log back in</Link></p>
      </div>
    );
  }
}

export default Logout;
