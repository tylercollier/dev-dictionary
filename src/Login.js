import React, { Component } from 'react';
import commonActions from './commonActions';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import FetchWrapper from './FetchWrapper';

class Login extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  static propTypes = {
    markUserLoggedIn: React.PropTypes.func.isRequired,
  };

  render() {
    const { loggedInUser } = this.context;
    const { markUserLoggedIn } = this.props;

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
        {!loggedInUser &&
          <FetchWrapper
            name="users"
            fetcher={() =>
              commonActions.fetchJson('/users')
                .then(response => ({ users: response }))
            }
            fetchWhenTrue={!loggedInUser}
          >{({ users }) =>
            <div className="users">
              {users.map(user => <div key={user.id} className="user">
                <Image src={'/avatars/' + user.avatarUrl} />
                {' '}
                <strong>{user.name}</strong>
                {' '}
                <Button bsStyle="link" onClick={() => markUserLoggedIn(user)}>Login as {user.name}</Button>
              </div>)}
            </div>
          }</FetchWrapper>
        }
      </div>
    );
  }
}

export default Login;
