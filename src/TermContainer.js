import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

class Term extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      termName: React.PropTypes.string.isRequired,
    })
  };

  render() {
    return (
      <div className="term">
        <Link to="/terms">
          <Glyphicon glyph="chevron-left" /> Back to terms
        </Link>
        <h1>[Term name goes here]</h1>
        <p>Your job here is to fetch the term and show its definitions. Use the <code>{'<Term>'}</code> component.</p>
        <p>Reminder: to fetch the term from the server by name, you can use the full text search capability with a limit of 1. For example, if the term in the URL is <strong>Full%20Stack</strong>, then you can use the URL</p>
        <code>
          /terms?q=Full%20Stack&_limit=1
        </code>
      </div>
    );
  }
}

export default Term;
