import React, { Component } from 'react';
import './Users.css';
import io from 'socket.io-client';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import Welcome from './Welcome.js';
import UserVoteList from './UserVoteList.js';
import Search from './Search.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

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
      userCount: 0,
      searchResults: [],
      user: { id: 0, name: '' }
    };
  };


  updateSearchResultsList = (results) => {
    this.setState({searchResults: results})
  };



  render() {
    return (
      <div className="App">
        <input type='text' name='name' onKeyUp={this.handleUserFieldKeyUp} />
        <br/><br/>
        <button value='songOne' onClick={this.handleSongClick} >Song 1</button>
        <button value='songTwo' onClick={this.handleSongClick} >Song 2</button>
        <button value='songThree' onClick={this.handleSongClick} >Song 3</button>
        {/* Welcome */}
        {/* PartyButton */}
        {/* UserVoteList */}
        {/* Search */}

      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <Welcome/>
        <Search updateSearchResultsList={this.updateSearchResultsList}/>
        <UserVoteList/>

      </div>
      </MuiThemeProvider>
      </div>

    );
  };
};

export default Users;
