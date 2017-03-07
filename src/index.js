import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Users from './Users';
import Three from './Three';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';



const config = require('../config');

injectTapEventPlugin();

let ws = io.connect(config.IO);


ReactDOM.render(
  <Router>
    <div>
      <Route path='/three' component={Three} />

      <Route
        exact path='/'
        render={() => <Redirect to={{ pathname: '/users' }} />}
      />
      <Route path='/host' component={() => <App ws={ws} />} />
      <Route path='/users' component={() => <Users ws={ws} />} />
    </div>
  </Router>
, document.getElementById('root'));
