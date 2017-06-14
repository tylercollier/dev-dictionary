import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

render(
  <App />,
  document.getElementById('root')
);

document.addEventListener('keydown', event => {
  event = event || window.event;
  if (event.altKey && event.keyCode === 82) {
    unmountComponentAtNode(document.getElementById('root'));
    render(
      <App />,
      document.getElementById('root')
    );
    console.log('-------- Done remounting app');
  }
});
