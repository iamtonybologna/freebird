import React, { Component } from 'react';
import logo from './logo.svg';
import './Users.css';
import { Link } from 'react-router-dom';

const ws = new WebSocket('ws://localhost:4000');

class Users extends Component {

  componentDidMount() {
    console.log('componentDidMount <Users />');
    ws.addEventListener('open', (event) => {
      console.log("Connected to WS Server.");
    });

    // New message
    ws.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      let type = data.type;
      switch(type) {
        case "updateUserCount":
          console.log(`Received from server: ${event.data}`);
          this.setState({ userCount: data.userCount });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    });

    ws.addEventListener('error', (error) => {
      console.log(`Error: ${error}`)
    });
  }

  componentWillUnmount() {
    console.log('Closing socket connection');
    ws.close();
  };

  constructor(props) {
    super(props);
    this.state = {
      userCount: 0
    };
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          {this.state.userCount} user(s) in room
        </div>
        <p className="App-intro">
          USERS PAGE
        </p>
        <p>
          <Link to='/host'>Host Page</Link>
          <br/>
          <Link to='/users'>Users Page</Link>
        </p>
        {/* Welcome */}
        {/* PartyButton */}
        {/* UserVoteList */}
        {/* Search */}
      </div>
    );
  }
}

export default Users;