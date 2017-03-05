import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Definition extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  render() {
    const { definition, index } = this.props;

    return (
      <div className="definition-container">
        <div className="definition">
          <div className="definition-index">{index}.</div>
          <div className="definition-content">{definition.content}</div>
        </div>
        <div className="submitted-by">
          <Image className="nav-avatar" src={'/avatars/' + definition.user.avatarUrl} />
          {' '}
          <strong>{definition.user.name}</strong>
        </div>
      </div>
    );
  }
}

export default Definition;
