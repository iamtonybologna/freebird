import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Player from './Player.js';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Host from './Host.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player1Hidden: "block",
      player2Hidden: "none",
      playing: null,
      notPlaying: null,
      userCount: 0
    };
  }


  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount });
   });
    this.ws.emit('youTube', 'ok');
    this.ws.on('update', function (data) {
      console.log('Received a message from the server!', data);
    });
    this.startUp();
  };


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
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Host/>
          <div>
            {this.state.userCount} user(s) in room
          </div>
          {/* NavBar */}
          {/* VideoEmbed */}
          {/* HostVoteList */}
        </div>
        <div style={{display: this.state.player1Hidden}}>
          <Player id={"player1"} ></Player>
        </div>
        <div style={{display: this.state.player2Hidden}}>
          <Player id={"player2"} ></Player>
        </div>
      </MuiThemeProvider>
    );
  };
};

export default App;