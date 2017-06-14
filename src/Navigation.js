import React, { Component } from 'react';
import { Badge, Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import InnerGlyphicon from './InnerGlyphicon';
import FetchWrapper from './FetchWrapper';
import commonActions from './commonActions';

class Navigation extends Component {
  static propTypes = {
    loggedInUser: React.PropTypes.object,
  }

  state = {
    updatedTime: Date.now()
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser !== this.props.loggedInUser && nextProps.loggedInUser) {
      this.setState({ updatedTime: Date.now() });
    }
  }

  render() {
    const { loggedInUser } = this.props;
    const { updatedTime } = this.state;

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Dev Dictionary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {loggedInUser && <LinkContainer to="/logout"><NavItem eventKey={2}>Logout</NavItem></LinkContainer>}
            {!loggedInUser && <LinkContainer to="/login"><NavItem eventKey={2}>Login</NavItem></LinkContainer>}
          </Nav>
          {loggedInUser && <Navbar.Text pullRight>
            <FetchWrapper
              fetcher={() => {
                return commonActions.fetchJson('/definitions?userId=' + loggedInUser.id)
                  .then(response => ({ count: response.length }))
              }}
              updatedTime={updatedTime}
              alwaysRender
            >{({ fetchWrapper: { isFetching }, count } = { fetchWrapper: {} }) =>
              <Badge>
                {isFetching && <InnerGlyphicon spin={true} />}
                {count || '-'}
              </Badge>
            }</FetchWrapper>
            {' '}
            definitions
          </Navbar.Text>}
          {loggedInUser && <Navbar.Text pullRight>
            You are currently logged in as <Image className="nav-avatar" src={'/avatars/' + loggedInUser.avatarUrl} />
            {' '}
            <strong>{loggedInUser.name}</strong>
          </Navbar.Text>}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
