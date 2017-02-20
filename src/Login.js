import React, { Component } from 'react';
import commonActions from './commonActions';
import { Alert, Button, Glyphicon, Image } from 'react-bootstrap';
import { Link } from 'react-router';

class Login extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  }

  static propTypes = {
    markUserLoggedIn: React.PropTypes.func.isRequired,
  };

  state = {
    fetchError: null,
    isFetching: false,
    users: null,
  };

  componentWillMount() {
    if (this.context.loggedInUser) {
      return;
    }

    this.setState({ isFetching: true })
    commonActions.fetchJson('/users')
      .then(response => {
        this.setState({ users: response })
      })
      .catch(error => this.setState({ fetchError: error.message }))
      .then(() => this.setState({ isFetching: false }));
  }

  render() {
    const { loggedInUser } = this.context;
    const { markUserLoggedIn } = this.props;
    const { fetchError, isFetching, users } = this.state;

    return (
      <div className="login-screen">
        {loggedInUser && <div>
          <p>
            You are currently logged in as <Image src={'/avatars/' + loggedInUser.avatarUrl} />
            {' '}
            <strong>{loggedInUser.name}</strong>
          </p>
          <p>If you want to login as another user, first <Link to="/logout">logout</Link>.</p>
        </div>}
        {!loggedInUser && <div>
          {isFetching && <div><Glyphicon glyph="refresh" className="spin" /> Loading...</div>}
          {fetchError && <Alert bsStyle="danger"><strong>Error!</strong> {fetchError} </Alert>}
          {users && <div className="users">
            {users.map(user => <div key={user.id} className="user">
              <Image src={'/avatars/' + user.avatarUrl} />
              {' '}
              <strong>{user.name}</strong>
              {' '}
              <Button bsStyle="link" onClick={() => markUserLoggedIn(user)}>Login as {user.name}</Button>
            </div>)}
          </div>}
        </div>}
      </div>
    );
  }
}

export default Login;
