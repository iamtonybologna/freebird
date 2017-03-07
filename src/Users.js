import React, { Component } from 'react';

// theme information, imports colors and material-ui information from node modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  deepPurple900,
  deepPurple500,
  deepPurple100,
  pinkA200,
  lightGreenA400,
  fullWhite
} from 'material-ui/styles/colors';

// list of objects/ views being imported
import Welcome from './Welcome.js';
import UserVoteList from './UserVoteList.js';
import Search from './Search.js';
import SearchResults from './SearchResults.js';
import NavBar from './NavBar.js';
import LoadingUser from './LoadingUser.js';
import DefaultSearch from './DefaultSearch.js';
import PartyButton from './PartyButton.js';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: deepPurple500,
    primary2Color: pinkA200,
    primary3Color: lightGreenA400,
    accent1Color: deepPurple900,
    accent2Color: deepPurple500,
    accent3Color: deepPurple500,
    textColor: fullWhite,
    alternateTextColor: deepPurple900,
    canvasColor: '#303030',
    borderColor: deepPurple900,
    disabledColor: deepPurple100,
    pickerHeaderColor: deepPurple500,
    clockCircleColor: fade(deepPurple500, 0.07),
    shadowColor: deepPurple500,
  },
});

class Users extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');

    this.props.ws.on('updateUpNext', (upNext) => {
      console.log('upNext', upNext);
      this.setState({ voteListLoaded: true, 'upNext': upNext.data });
      console.log('Current state: ', this.state);
    });

    this.props.ws.on('updatePlaylist', (playlist) => {
      console.log('playlist', playlist);
      let playlistById = [];
      playlist.data.forEach(function(item) {
        playlistById.push(item.songId)
      })
      console.log(playlistById)
      this.setState({ playlist: playlistById });
      console.log('Current state: ', this.state);
    });

    this.props.ws.on('checkForUpNext', (data) => {
      console.log('Received a message from the server!', data);
      if (data.upNext.length > 0) {
        this.setState({ upNext: data.upNext, voteListLoaded: true });
      };
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.props.ws.close();
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 3,
      userCount: 0,
      searchResults: [],
      user: { id: 0, name: '' },
      voteListLoaded: false,
      upNext: [],
      playlist: [],
      selectedSongs: [],
      newVoteId: '',
      readyToParty: false,
    };

    this.renderView = () => {
      switch (this.state.view) {
        case 3:
          return (
            <Welcome handleNewName={this.handleNewName} handleSubmitName={this.handleSubmitName}/>
        )
        case 0:
          if (this.state.voteListLoaded === false) {
            return (
            <div>
              <LoadingUser />
              <NavBar switcher={this.switcher} view={this.state.view}/>
            </div>
          )
        } else if (this.state.readyToParty === true) {
          return (
            <div>
              <PartyButton handlePartyPress={this.handlePartyPress}/>
              <UserVoteList voteFor={this.handleSongClick} upNext={this.state.upNext} newVoteId={this.state.newVoteId}/>
              <NavBar switcher={this.switcher} view={this.state.view}/>
            </div>
          )
        } else {
              return (
                <div>
                  <UserVoteList voteFor={this.handleSongClick} upNext={this.state.upNext} newVoteId={this.state.newVoteId}/>
                  <NavBar switcher={this.switcher} view={this.state.view}/>
                </div>
              )
            }
        case 1:
          if (this.state.searchResults < 1 ){
            return (
            <div>
              <Search updateSearchResultsList={this.updateSearchResultsList} />
              <DefaultSearch />
              <NavBar switcher={this.switcher} view={this.state.view}/>
            </div>
          )
            } else {
              return (
                <div>
                  <Search updateSearchResultsList={this.updateSearchResultsList} switcher={this.switcher} />
                  <SearchResults results={this.state.searchResults} submitNewSong={this.handleSongAddition} selectedSongs={this.state.selectedSongs} playlist={this.state.playlist}/>
                  <NavBar switcher={this.switcher} view={this.state.view}/>
                </div>
              )
            }
        default:
          break;
      };
    };
  };

  switcher = (newView) => {
    this.setState({ view: newView });
  };

  updateSearchResultsList = (results) => {
    this.setState({ searchResults: results});
  };

  handlePartyPress = () => {

  };

  handleSubmitName = () => {
    if (this.state.user.name) {
      let name = this.state.user.name;
      console.log('Sending username to server', name);
      this.props.ws.emit('setUsername', { 'name': name }, (userId) => {
        console.log('Received UUID from server', userId);
        this.setState({ user: { id: userId , name: name } });
        console.log('Current state: ', this.state);
      });
        if (this.state.voteListLoaded === true) {
        this.setState({ view: 0 });
      } else {
        this.setState({ view: 1 });
      }
    }
  };

  handleNewName = (e) => {
    this.setState({ user: { name: e.target.value } });
    if (e.key === 'Enter' && this.state.user.name) {
      let name = this.state.user.name;
      console.log('Sending username to server', name);
      this.props.ws.emit('setUsername', { 'name': name }, (userId) => {
        console.log('Received UUID from server', userId);
        this.setState({ user: { id: userId , name: name } });
        console.log('Current state: ', this.state);
      });
        if (this.state.voteListLoaded === true) {
        this.setState({ view: 0 });
      } else {
        this.setState({ view: 1 });
      }
    };
  };

  handleSongClick = (e) => {
    this.setState({newVoteId: e});
    this.props.ws.emit('setUserVote', { userId: this.state.user.id, 'songId': e });
    console.log('Vote sent to server', { userId: this.state.user.id, 'songId': e });
  };

  handleSongAddition = (e) => {
    let newList = this.state.selectedSongs
    if (this.state.selectedSongs.indexOf(e.id.videoId) === -1 ) {
      newList.push(e.id.videoId)
      this.setState({selectedSongs: newList})
    } else {
      let index = newList.indexOf(e.id.videoId);
      newList.splice(index, 1);
      this.setState({selectedSongs: newList})
    }

    this.props.ws.emit('addNewSong', {
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
