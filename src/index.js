import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Users from './Users';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route } from 'react-router-dom';

injectTapEventPlugin();

ReactDOM.render((
  <Router>
    <div>
      <Route path='/host' component={App} />
      <Route path='/users' component={Users} />
    </div>
  </Router>
), document.getElementById('root'));
