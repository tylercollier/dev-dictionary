import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import FetchWrapper from './FetchWrapper';
import commonActions from './commonActions';
import Term from './Term';

class TermContainer extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  render() {
    const { params: { termName } } = this.props;

    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <h1>{termName}</h1>
        <FetchWrapper
          name="term"
          fetcher={() =>
            commonActions.fetchJson(`/terms?name=${termName}&_embed=definitions&_limit=1`)
              .then(response => {
                if (response.length) {
                  return { term: response[0] };
                }
                throw new Error(`Term '${termName}' not found`);
              })
          }
          solutionSuggestion={<p>Make sure you spelled the term correctly. Perhaps you have an old bookmark? You may visit the <Link to="/terms">terms page</Link> and navigate from there.</p>}
        >{({ term }) =>
          <Term term={term} />
        }</FetchWrapper>
      </div>
    );
  }
}

export default TermContainer;
