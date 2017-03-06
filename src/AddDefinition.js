import React, { Component } from 'react';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Image, Well } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import FetchWrapper from './FetchWrapper';
import InnerGlyphicon from './InnerGlyphicon';
import PostWrapper from './PostWrapper';
import commonActions from './commonActions';
import serialize from 'form-serialize';

const userComponent = props => {
  const value = props.value ? props.value : props.option
  return (
    <div className="user-select-component" onClick={() => props.onSelect(value)}>
      <Image className="nav-avatar" src={'/avatars/' + value.avatarUrl} />
      {' '}
      <strong>{value.name}</strong>
    </div>
  )
};

class AddDefinition extends Component {
  static propTypes = {
    hide: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func,
    termId: React.PropTypes.number.isRequired,
  };

  state = {
    who: null,
  };

  selectWho = user => this.setState({ who: user });

  render() {
    const { hide, onCreate, termId } = this.props;
    const { who } = this.state;

    return (
      <FetchWrapper
        name="user list"
        fetcher={() =>
          commonActions.fetchJson('/users')
            .then(response => ({ users: response }))
        }
      >{({ users }) =>
        <PostWrapper
          poster={event => {
            const form = event.target.form;
            const formData = serialize(form, { hash: true });

            return commonActions.fetchJson('/definitions', {
              method: 'POST',
              body: {
                ...formData,
                termId,
                userId: who.id,
              }
            })
              .then(() => {
                form.reset();
                this.setState({ who: null });
                onCreate && onCreate();
              });
          }}
        >{({ submitting, error, post, submitSucceeded }) =>
          <Well className="add-term">
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Definition
                </Col>
                <Col sm={10}>
                  <FormControl name="content" componentClass="textarea" placeholder="Add your definition"/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  Who's definition?
                </Col>
                <Col sm={10}>
                  <Select
                    options={users}
                    optionComponent={userComponent}
                    ignoreCase
                    onChange={this.selectWho}
                    value={who}
                    valueComponent={userComponent}
                  />
                  <HelpBlock>If you heard someone provide this definition, you can credit it to them. Otherwise, choose yourself.</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsStyle="primary" onClick={post}>
                    <InnerGlyphicon spin={submitting} /> Submit the definition
                  </Button>
                  <Button bsStyle="link" onClick={hide}>Cancel</Button>
                  <p></p>
                  {error && <Alert bsStyle="danger">
                    <strong>Uh oh!</strong> Something went wrong: {error.message}
                  </Alert>}
                  {submitSucceeded && <Alert bsStyle="success">
                    <strong>Success!</strong> New definition was submitted. <Button bsStyle="link" onClick={hide}>Ok</Button>
                  </Alert>}
                </Col>
              </FormGroup>
            </Form>
          </Well>
        }</PostWrapper>
      }</FetchWrapper>
    );
  }
}

export default AddDefinition;
