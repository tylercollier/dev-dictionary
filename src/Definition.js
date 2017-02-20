import React, { Component } from 'react';

class Definition extends Component {
  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  render() {
    const { definition, index } = this.props;

    return (
      <div className="definition">
        <div className="definition-index">{index}.</div>
        <div className="definition-content">{definition.content}</div>
      </div>
    );
  }
}

export default Definition;
