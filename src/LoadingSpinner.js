import React, { PureComponent, PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'

class LoadingSpinner extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    showMessage: PropTypes.bool,
  }

  static defaultProps = {
    showMessage: true,
  }

  render() {
    return (
      <div className="loading-spinner">
        {this.props.showMessage ? this.props.message || 'Loading...' : ''}
        {' '}
        <Glyphicon glyph="refresh" className="glyphicon-spin" />
      </div>
    )
  }
}

export default LoadingSpinner
