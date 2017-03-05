import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import Term from './Term';
import AddTerm from './AddTerm';
import FetchWrapper from './FetchWrapper';
import commonActions from './commonActions';

class Dictionary extends Component {
  state = {
    showAddTerm: false
  };

  toggleAdd = () => this.setState({ showAddTerm: !this.state.showAddTerm });

  render() {
    const { showAddTerm } = this.state;

    return (
      <FetchWrapper
        name="terms and definitions"
        fetcher={() =>
          Promise.all([
            commonActions.fetchJson('/terms?_expand=user&_sort=name'),
            commonActions.fetchJson('/definitions?_expand=user'),
          ])
            .then(([terms, definitions]) => {
              const deepTerms = terms.map(term => {
                return Object.assign({}, { ...term, definitions: definitions.filter(d => d.termId === term.id)});
              })
              return { terms: deepTerms };
            })
        }
      >{({ terms, fetchWrapper: { refetch } }) =>
        <div>
          <h2>Terms</h2>
          <Button bsStyle="success" onClick={this.toggleAdd}>
            <Glyphicon glyph="plus-sign" /> Add term
          </Button>
          {showAddTerm && <AddTerm hide={this.toggleAdd} onCreate={refetch} />}
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
