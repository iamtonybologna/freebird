import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import '../public/iframe_api.js';


class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = io.connect('ws://localhost:4000');
    this.ws.emit('youTube', 'ok');

  }


  loadPlayer(){
    console.log(window.player1.getDuration());
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
          HOSTS PAGE
        </p>
        <p>
          <Link to="/host">Host Page</Link>
          <br/>
          <Link to="/users">Users Page</Link>
          <button onClick={this.loadPlayer}>Movie</button>
        </p>
        <div id="player1">
        </div>
        <div id="player2"></div>

      </div>
    );
  }
}

export default App;