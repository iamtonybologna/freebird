import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import Player from './Player.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player1Hidden: "block",
      player2Hidden: "none",
      playing: null,
      notPlaying: null
    };
  }

    componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = io.connect('ws://localhost:4000');
    this.ws.emit('youTube', 'ok');
    this.ws.on('update', function (data) {
      console.log('Received a message from the server!', data);
    });
    this.startUp();

  }

  startUp() {
    let err = false;
    try {
      window.player1.playVideo();
    } catch (e) {
      console.log(err);
      err = true;
    }
    if (err === true) {
      setTimeout(() => {
        this.startUp();
      }, 500);
    } else {
      console.log('loaded');
      window.player1.playVideo();
      this.playerTime();
    }
  };

  playerTime() {
    let videoDuration = window.player1.getDuration();
    let timePlayed = window.player1.getCurrentTime();
    if (videoDuration - timePlayed <= 180)
    {
      this.loadPlayer();
    } else {
      setTimeout(() => {
        this.playerTime();
      }, 1000);
    }
  }

  loadPlayer() {
    window.player2.playVideo();
    window.player2.setVolume(100);
    setTimeout(() => {
      this.setState({player1Hidden: "none"});
      this.setState({player2Hidden: "block"});
      this.setState({playing: 2});
      window.player1.stopVideo();
    }, 5000);
  }


  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          HOSTS PAGE
        </p>
        <p>
          <Link to="/host">Host Page</Link>
          <br/>
          <Link to="/users">Users Page</Link>
          <button onClick={this.loadPlayer}></button>
        </p>
        <div style={{display: this.state.player1Hidden}}>
        <Player id={"player1"} ></Player>
        </div>
        <div style={{display: this.state.player2Hidden}}>
          <Player id={"player2"} ></Player>
        </div>
      </div>
    );
  }
}

export default App;