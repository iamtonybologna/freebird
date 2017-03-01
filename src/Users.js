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
import LoadingUser from './LoadingUser.js';


const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

class Users extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('updateUpNext', (upNext) => {
      console.log('upNext', upNext);
      this.setState({ voteListLoaded: true, 'upNext': upNext.data });
      console.log('Current state: ', this.state);
    });

    this.ws.on('updatePlaylist', (playlist) => {
      console.log('playlist', playlist);
      this.setState({ playlist: playlist.data });
      console.log('Current state: ', this.state);
    });

    this.ws.on('checkForUpNext', (data) => {
      console.log('Received a message from the server!', data);
      if (data.upNext.length > 0) {
        this.setState({ upNext: data.upNext, voteListLoaded: true });
      };
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 0,
      userCount: 0,
      searchResults: [],
      user: { id: 0, name: '' },
      voteListLoaded: false,
      upNext: [],
      playlist: []
    };

    this.renderView = () => {
      switch (this.state.view) {
        case 0:
          return (
            <Welcome handleNewName={this.handleNewName} />
        )
        case 1:
          if (this.state.voteListLoaded === false) {
            return (
            <div>
              <LoadingUser />
              <NavBar switcher={this.switcher} />
            </div>
          )
            } else {
              return (
                <div>
                  <UserVoteList voteFor={this.handleSongClick} upNext={this.state.upNext} />
                  <NavBar switcher={this.switcher} />
                </div>
              )
            }
        case 2:
          return (
            <div>
              <Search updateSearchResultsList={this.updateSearchResultsList} />
              <NavBar switcher={this.switcher} />
            </div>
          )
        case 3:
          return (
            <div>
              <Search updateSearchResultsList={this.updateSearchResultsList} switcher={this.switcher} />
              <SearchResults results={this.state.searchResults} submitNewSong={this.handleSongAddition} />
              <NavBar switcher={this.switcher} />
            </div>
          )
        default:
          break;
      };
    };
  };

  switcher = (newView) => {
    this.setState({ view: newView });
    console.log(this.state.searchResults);
  };

  updateSearchResultsList = (results) => {
    this.setState({ searchResults: results, view: 3 });
  };

  handleNewName = (e) => {
    if (e.key === 'Enter') {
      let name = e.target.value;
      console.log('Sending username to server', name);
      this.ws.emit('setUsername', { 'name': name }, (userId) => {
        console.log('Received UUID from server', userId);
        this.setState({ user: { id: userId , name: name } });
        console.log('Current state: ', this.state);
      });
      this.setState({ view: 1 });
    };
  };

  handleSongClick = (e) => {
    this.ws.emit('setUserVote', { userId: this.state.user.id, 'songId': e });
    console.log('Vote sent to server', { userId: this.state.user.id, 'songId': e });
  };

  handleSongAddition = (e) => {
    this.ws.emit('addNewSong', {
        'userId': this.state.user.id,
        'songId': e.id.videoId,
        'songTitle': e.snippet.title,
        'songImageMedium': e.snippet.thumbnails.medium.url,
        'songImageHigh': e.snippet.thumbnails.high.url
      }
    );
    console.log('New song sent to server', {
        'userId': this.state.user.id,
        'songId': e.id.videoId,
        'songTitle': e.snippet.title,
        'songImageMedium': e.snippet.thumbnails.medium.url,
        'songImageHigh': e.snippet.thumbnails.high.url
      }
    );
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            { this.renderView() }
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
};

export default Users;
