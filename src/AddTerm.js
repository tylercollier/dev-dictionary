import React, { Component } from 'react';
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';
import PostWrapper from './PostWrapper';
import serialize from 'form-serialize';
import commonActions from './commonActions';
import InnerGlyphicon from './InnerGlyphicon';

class AddTerm extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    loggedInUser: React.PropTypes.object,
    onCreate: React.PropTypes.func.isRequired,
  };

  render() {
    const { hide, loggedInUser, onCreate } = this.props;

    return (
      <PostWrapper
        poster={event => {
          const form = event.target.form;
          const formData = serialize(form, { hash: true });
          return commonActions.fetchJson('/terms', { method: 'POST', body: { ...formData, userId: loggedInUser.id }})
            .then(() => {
              form.reset();
              onCreate();
            })
        }}
      >{({ submitting, error, post, submitSucceeded }) =>
        <Well className="add-term">
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Term
              </Col>
              <Col sm={10}>
                <FormControl name="name" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" onClick={post}>
                  <InnerGlyphicon spin={submitting} /> Submit the term
                </Button>
                <Button bsStyle="link" onClick={hide}>Cancel</Button>
                <p></p>
                {error && <Alert bsStyle="danger">
                  <strong>Uh oh!</strong> Something went wrong: {error.message}
                </Alert>}
                {submitSucceeded && <Alert bsStyle="success">
                  <strong>Success!</strong> New term was submitted. <Button bsStyle="link" onClick={hide}>Ok</Button>
                </Alert>}
              </Col>
            </FormGroup>
          </Form>
        </Well>
      }</PostWrapper>
    );
  }
}

export default AddTerm;
