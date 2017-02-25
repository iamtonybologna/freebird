import React, { Component } from 'react';
import logo from './logo.svg';
import './Users.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

class Users extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('setUsername', (user) => {
      console.log(user);
      this.setState({ user: { id: user.id , name: user.name } });
      console.log('Current state: ', this.state);
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  constructor(props) {
    super(props);

    this.handleUserFieldKeyUp = (e) => {
      if (e.key === 'Enter') {
        this.ws.emit('setUsername', { 'name': e.target.value });
        console.log('Username sent to server', e.target.value);
      };
    };

    this.handleSongClick = (e) => {
      this.ws.emit('setUserVote', { id: this.state.user.id, 'song': e.target.value });
      console.log('Vote sent to server', { id: this.state.user.id, 'song': e.target.value });
    };

    this.state = {
      user: { id: 0, name: '' }
    };
  };

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
          <Link to='/host'>Host Page</Link>
          <br/>
          <Link to='/users'>Users Page</Link>
        </p>
          <input type='text' name='name' onKeyUp={this.handleUserFieldKeyUp} />
          <br/><br/>
          <button value='songOne' onClick={this.handleSongClick} >Song 1</button>
          <button value='songTwo' onClick={this.handleSongClick} >Song 2</button>
          <button value='songThree' onClick={this.handleSongClick} >Song 3</button>
        {/* Welcome */}
        {/* PartyButton */}
        {/* UserVoteList */}
        {/* Search */}
      </div>
    );
  };
};

export default Users;