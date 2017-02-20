import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Definition from './Definition';
import AddDefinition from './AddDefinition';
import { Link } from 'react-router';

class Term extends Component {
  static propTypes = {
    term: React.PropTypes.object.isRequired,
  };

  state = {
    showAddDefinition: false
  };

  toggleAdd = () => this.setState({ showAddDefinition: !this.state.showAddDefinition })

  render() {
    const { term } = this.props;
    const { showAddDefinition } = this.state;

    return (
      <div className="term">
        <h3><Link to={`/terms/${term.name}`}>{term.name}</Link></h3>
        {term.definitions.map((definition, index) => {
          return <Definition key={definition.id} definition={definition} index={index + 1} />
        })}
        <div className="add-definition-section">
          <Button bsStyle="info" bsSize="xsmall" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add definition
          </Button>
          {showAddDefinition && <AddDefinition hide={this.toggleAdd} />}
        </div>
      </div>
    );
  }
}

export default Term;
