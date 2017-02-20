import React, { Component } from 'react';
import Definition from './Definition';
import { Link } from 'react-router';

class Term extends Component {
  static propTypes = {
    term: React.PropTypes.object.isRequired,
  };

  render() {
    const { term } = this.props;

    return (
      <div className="term">
        <h3><Link to={`/terms/${term.name}`}>{term.name}</Link></h3>
        {term.definitions.map((definition, index) => {
          return <Definition key={definition.id} definition={definition} index={index + 1} />
        })}
      </div>
    );
  }
}

export default Term;
