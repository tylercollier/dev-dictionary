import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
            commonActions.fetchJson(`/terms?name=${termName}&_expand=user&_limit=1`)
              .then(response => {
                if (!response.length) {
                  throw new Error(`Term '${termName}' not found`);
                }
                const term = response[0];
                return term;
              })
              .then(term =>
                commonActions.fetchJson(`/definitions?termId=${term.id}&_expand=user`)
                  .then(definitions => ({ term: Object.assign({}, term, { definitions }) }))
              )
          }
          solutionSuggestion={<p>Make sure you spelled the term correctly. Perhaps you have an old bookmark? You may visit the <Link to="/terms">terms page</Link> and navigate from there.</p>}
        >{({ term, fetchWrapper: { refetch } }) =>
          <Term term={term} onUpdateTerm={refetch} />
        }</FetchWrapper>
      </div>
    );
  }
}

export default TermContainer;
