import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Users from './Users';
import './index.css';
import {
  BrowserRouter as Router,
  // eslint-disable-next-line
  StaticRouter, // for server rendering
  Route,
  // eslint-disable-next-line
  Link
  // etc.
} from 'react-router-dom';

ReactDOM.render((
  <Router>
    <div>
      <Route path="/host" component={App} />
      <Route path="/users" component={Users} />
    </div>
  </Router>
), document.getElementById('root'));