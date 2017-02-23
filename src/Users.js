import React, { Component } from 'react';
import logo from './logo.svg';
import './Users.css';
const io = require('socket.io-client');

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    io('ws://localhost:4000');
    console.log(io('ws://localhost:4000').connect);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          USERS PAGE
        </p>
      </div>
    );
  }
}

export default App;