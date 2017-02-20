import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Well } from 'react-bootstrap';

class AddDefinition extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
  };

  createDefinition = () => {
    // POST the definition to the server.
  }

  render() {
    const { hide } = this.props;

    return (
      <Well className="add-term">
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Definition
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" placeholder="Add your definition"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              Who's definition?
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" placeholder="select">
                <option value="">select</option>
                <option value="1">Alice</option>
                <option value="2">Dilbert</option>
                <option value="3">Wally</option>
              </FormControl>
              <HelpBlock>If you heard someone provide this definition, you can credit it to them</HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit" onClick={this.createDefinition}>
                Submit the definition
              </Button>
              <Button bsStyle="link" onClick={hide}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </Well>
    );
  }
}

export default AddDefinition;
