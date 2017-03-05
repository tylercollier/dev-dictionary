import React, { Component } from 'react';
import { Badge, Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import InnerGlyphicon from './InnerGlyphicon';
import FetchWrapper from './FetchWrapper';
import commonActions from './commonActions';

class Navigation extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  }

  state = {
    updatedTime: Date.now()
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.loggedInUser != this.context.loggedInUser && nextContext.loggedInUser) {
      this.setState({ updatedTime: Date.now() });
    }
  }

  render() {
    const { loggedInUser } = this.context;
    const { updatedTime } = this.state;

    return (
      <FetchWrapper
        fetcher={() => {
          return commonActions.fetchJson('/definitions?userId=' + this.context.loggedInUser.id)
            .then(response => ({ count: response.length }))
        }}
        updatedTime={updatedTime}
        alwaysRender
      >{({ fetchWrapper: { isFetching }, count } = { fetchWrapper: {} }) =>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Dev Dictionary</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {loggedInUser && <Navbar.Text>
                You are currently logged in as <Image className="nav-avatar" src={'/avatars/' + loggedInUser.avatarUrl} />
                {' '}
                <strong>{loggedInUser.name}</strong>
              </Navbar.Text>}
              {loggedInUser && <Navbar.Text>
                <Badge>
                  {isFetching && <InnerGlyphicon spin={true} />}
                  {!!count && count.toString()}
                </Badge>
                {' '}
                definitions
              </Navbar.Text>}
              {loggedInUser && <LinkContainer to="/logout"><NavItem eventKey={2}>Logout</NavItem></LinkContainer>}
              {!loggedInUser && <LinkContainer to="/login"><NavItem eventKey={2}>Login</NavItem></LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }</FetchWrapper>
    )
  }
}

export default Navigation
