import { Component, PropTypes } from 'react';

class PostWrapper extends Component {
  static propTypes = {
    children: PropTypes.func,
    poster: PropTypes.func.isRequired,
  };

  state = {
    data: null,
    error: null,
    submitting: false,
    submitSucceeded: false,
  };

  constructor() {
    super();
    this.setState = this.setState.bind(this);
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  // https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
  setState(state) {
    if (this._isMounted) {
      super.setState(state);
    }
  }

  post = (...args) => {
    this.setState({ submitting: true });

    this.props.poster(...args)
      .then(response => this.setState({ data: response }))
      .catch(error => this.setState({ error }))
      .then(() => this.setState({ submitting: false }));
  };

  componentDidMount = () => this._isMounted = true;

  render = () => {
    const { data, error, submitting, submitSucceeded } = this.state;
    const { children } = this.props;

    return children({ data, error, submitting, submitSucceeded, post: this.post });
  }
}

export default PostWrapper