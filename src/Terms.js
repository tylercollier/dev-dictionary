import React, { Component } from 'react';
import Term from './Term';
import jsonData from '../data/db';
import filter from 'lodash/filter'

// Don't do this. You need to actually fetch the data from the server using
// the API. This is a cheater way just to provide a visual example of what you
// should see when you're done.
const terms = jsonData.terms.map(term => ({
  ...term,
  definitions: filter(jsonData.definitions, { termId: term.id })
}))


class Terms extends Component {
  render() {
    return (
      <div>
        <h2>Terms</h2>
        <div className="terms">
          {terms.map(term => {
            return <Term key={term.id} term={term} />;
          })}
        </div>
      </div>
    );
  }
}

export default Terms;
