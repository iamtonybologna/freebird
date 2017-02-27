import React, { Component } from 'react';
import './Users.css';
import io from 'socket.io-client';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import Welcome from './Welcome.js';
import UserVoteList from './UserVoteList.js';
import Search from './Search.js';
import SearchResults from './SearchResults.js';
import NavBar from './NavBar.js';

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

    this.renderView = () => {
      switch(this.state.view) {
        case 0:
          return <Welcome handleNewName={this.handleNewName}/>
        case 1:
          return <UserVoteList voteFor={this.handleSongClick}/>
        case 2:
          return <Search updateSearchResultsList={this.updateSearchResultsList} />
        case 3:
        return (
        <div>
          <Search updateSearchResultsList={this.updateSearchResultsList} switcher={this.switcher}/>
          <SearchResults results={this.state.searchResults} submitNewSong={this.handleSongAddition}/>
        </div>
      )
      }
    }


    this.state = {
      view: 1,
      userCount: 0,
      searchResults: [],
      user: { id: 0, name: '' }
    };
  };

  switcher = (newView) => {
    this.setState({view: newView})
    console.log(this.state.searchResults)
  }

  updateSearchResultsList = (results) => {
      this.setState({searchResults: results,
                    view: 3
                    })
  };

  handleNewName = (e) => {
    if (e.key === 'Enter') {
      this.ws.emit('setUsername', { 'name': e.target.value });
      console.log('Username sent to server', e.target.value);
    };
  };

  handleSongClick = (e) => {
    this.ws.emit('setUserVote', { id: this.state.user.id, 'song': e });
    console.log('Vote sent to server', { id: this.state.user.id, 'song': e });
  };

  handleSongAddition = (e) => {
    this.ws.emit('addNewSong', { id: this.state.user.id, 'song': e });
    console.log('New song sent to server', {id: this.state.user.id, 'song': e });
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            { this.renderView() }
            <NavBar switcher={this.switcher}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  };
};

export default Users;
