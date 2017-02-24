import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';


class App extends Component {

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = io.connect('ws://localhost:4000');
    this.ws.emit('youTube', 'ok');
    this.ws.on('update', function (data) {
      console.log('Received a message from the server!', data);
    });
    this.startUp();

  }

  //recusive timer that test for YT load
  startUp() {
    let err = false;
    try {
      window.player1.playVideo();
    } catch (e) {
      console.log(err);
      err = true;
    }
    if (err === true){
     setTimeout(() => {
        this.startUp();
      }, 500);


    } else {
      console.log('loaded');
      window.player1.playVideo();
    }
  };

  loadPlayer() {
    console.log('clicked');
    new window.YT.Player('player3', {
      height: '390',
      width: '640',
      videoId: 'bnKFaAS30X8'
    });
    window.player1.stopVideo();
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
          <button onClick={this.loadPlayer}>Movie</button>
        </p>

        <div id="player1"></div>
        <div id="player2"></div>

      </div>
    );
  }
}

export default App;