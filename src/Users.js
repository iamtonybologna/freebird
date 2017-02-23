import React, { Component } from 'react';
import logo from './logo.svg';
import './Users.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = io.connect('ws://localhost:4000');
  }

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
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
        <p>
          <Link to="/host">Host Page</Link>
          <br/>
          <Link to="/users">Users Page</Link>
        </p>
      </div>
    );
  }
}

export default App;