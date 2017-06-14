import React, { Component, PropTypes } from 'react';
import LoadingSpinner from './LoadingSpinner';

class FetchWrapper extends Component {
  static propTypes = {
    alwaysRender: PropTypes.bool,
    children: PropTypes.func,
    fetcher: PropTypes.func.isRequired,
    name: PropTypes.string,
    updatedTime: PropTypes.number,
    solutionSuggestion: PropTypes.node,
  };

  static defaultProps = {
    alwaysRender: false,
  };

  state = {
    error: null,
    isFetching: false,
    data: null,
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedTime > this.props.updatedTime) {
      this.doFetch();
    } else if (nextProps.fetchWhenTrue && !this.props.fetchWhenTrue) {
      this.doFetch();
    }
  }

  // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
  setState(state) {
    if (this._isMounted) {
      super.setState(state);
    }
  }

  doFetch = () => {
    this.setState({ isFetching: true });

    this.props.fetcher()
      .then(response => this.setState({ data: response }))
      .catch(error => this.setState({ error }))
      .then(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this._isMounted = true;

    let shouldFetchNow = true;
    if ('fetchWhenTrue' in this.props) {
      shouldFetchNow = this.props.fetchWhenTrue;
    }
    if (shouldFetchNow) {
      this.doFetch();
    }
  }

  render() {
    const { data, error, isFetching } = this.state;
    const { children, name, solutionSuggestion, alwaysRender } = this.props;

    if (error) {
      return (
        <div>
          <p><strong>Error!</strong> Error fetching {name}: {error.message || error}</p>
          {solutionSuggestion || <p>{solutionSuggestion}</p>}
        </div>
      );
    } else if (data || alwaysRender) {
      if (data) {
        return children(Object.assign({}, data, { fetchWrapper: { refetch: this.doFetch, isFetching: this.state.isFetching } }));
      }
      return children();
    } else if (isFetching) {
      return <LoadingSpinner message={`Loading ${name}...`} />;
    } else {
      return <div></div>;
    }
  }
}

export default FetchWrapper;
