import 'isomorphic-fetch';
import deepmerge from 'deepmerge';

class CommonActions {
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      if (response.body) {
        return response.json().then(body => {
          const error = new Error(body.message || body);
          error.response = response;
          return error;
        });
      } else {
        const error = new Error(response.statusText)
        error.response = response;
        throw error;
      }
    }
  }

  parseJson(response) {
    return response.json().then(body => {
      if (body.status === 'fail') {
        const error = new Error(body.data.message);
        error.response = response;
        throw error;
      }
      else {
        return Promise.resolve(body);
      }
    })
  }

  fetchJson(url, fetchOptions = {}) {
    const defaultFetchOptions = {
      method: 'get',
      body: null,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const modifiedFetchOptions = deepmerge(defaultFetchOptions, fetchOptions);

    if (fetchOptions.body) {
      modifiedFetchOptions.body = JSON.stringify(fetchOptions.body);
    }
    return fetch(url, modifiedFetchOptions)
      .then(this.checkStatus)
      .then(this.parseJson);
  }
}

export default new CommonActions()
