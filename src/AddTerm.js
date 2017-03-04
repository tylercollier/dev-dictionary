import React, { Component } from 'react';
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Col, Well } from 'react-bootstrap';
import PostWrapper from './PostWrapper';
import serialize from 'form-serialize';
import commonActions from './commonActions';
import InnerGlyphicon from './InnerGlyphicon';

class AddTerm extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
  };

  render() {
    const { hide } = this.props;

    return (
      <PostWrapper
        poster={event => {
          const formData = serialize(event.target.form, { hash: true });
          return commonActions.fetchJson('/terms', { method: 'POST', body: formData })
        }}
      >{({ submitting, error, post }) =>
        <Well className="add-term">
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Term
              </Col>
              <Col sm={10}>
                <FormControl name="term" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="primary" onClick={post}>
                  <InnerGlyphicon spin={submitting} /> Submit the term
                </Button>
                <Button bsStyle="link" onClick={hide}>Cancel</Button>
              </Col>
              {error && <Alert bsStyle="error">
                <strong>Uh oh!</strong> Something went wrong: {error}
              </Alert>}
            </FormGroup>
          </Form>
        </Well>
      }</PostWrapper>
    );
  }
}

export default AddTerm;
