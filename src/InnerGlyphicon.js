import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';

class InnerGlyphicon extends Component {
  static propTypes = {
    glyph: PropTypes.string,
    spin: PropTypes.bool,
  };

  render = () => {
    let glyph = this.props.glyph || 'ok';
    if (this.props.spin) {
      glyph = 'refresh';
    }
    const className = this.props.spin ? 'glyphicon-spin' : '';

    return (<span>
      <Glyphicon glyph={glyph} className={className} />
      &nbsp;&nbsp;
    </span>);
  }
}

export default InnerGlyphicon;
