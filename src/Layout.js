import React, { Component } from 'react';
import Navigation from './Navigation';
import { Grid, Row, Col } from 'react-bootstrap';

class Layout extends Component {
  static propTypes = {
    loggedInUser: React.PropTypes.object,
  }

  render() {
    const { loggedInUser } = this.props;

    return (
      <div>
        <Navigation loggedInUser={loggedInUser} />
        <Grid>
          <Row>
            <Col>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Layout;
