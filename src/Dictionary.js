import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import FetchWrapper from './FetchWrapper';
import commonActions from './commonActions';

class Dictionary extends Component {
  state = {
    showAddTerm: true
  };

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm });

  render() {
    const { showAddTerm } = this.state;

    return (
      <FetchWrapper
        name="terms and definitions"
        fetcher={() =>
          commonActions.fetchJson('/terms?_embed=definitions&_embed=user')
            .then(response => ({ terms: response }))
        }
      >{({ terms }) =>
        <div>
          <h2>Terms</h2>
          <Button bsStyle="success" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add term
          </Button>
          {showAddTerm && <AddTerm hide={this.toggleAdd} />}
          <div className="terms">
            {terms.map(term => {
              return <Term key={term.id} term={term} />;
            })}
          </div>
        </div>
      }</FetchWrapper>
    );
  }
}

export default Dictionary;
