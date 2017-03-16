import React, { Component } from 'react';
import cookie from 'react-cookie';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan500, cyan700, deepPurple500, deepPurple50, deepPurple100, deepPurple900,
  pinkA200, lightGreenA400,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, fullWhite,
} from 'material-ui/styles/colors';

import VideoEmbed from './VideoEmbed.js';
import HostVoteList from './HostVoteList.js';
import Splash from './splash.js';
import Loading from './Loading.js';
import Spaceman from './Spaceman.js';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Skip from 'material-ui/svg-icons/av/skip-next';
import Snackbar from 'material-ui/Snackbar';
import Three from './Three';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: deepPurple500,
    primary2Color: pinkA200,
    primary3Color: lightGreenA400,
    accent1Color: '#0ff',
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

const styles = {
  newWinner: {
    position: 'absolute'
  },
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      votes: null,
      view: 'splash',
      upNext: [{ songId: 'JFDj3shXvco' }],
      winner: '',
      winnerName: '',
      displayVotes: [],
      open: false,
      playList: [],
      room: null
    };


    this.renderView = () => {
      switch(this.state.view) {
        case 'splash':
          return (
            <div>
              <Splash switcher={this.switcher} />
            </div>
            )
        case 'loading':
              return (
                <div>
                  <Three />
                  <Loading switcher={this.switcher} playList={this.state.playList} />
                </div>
                )
        case 'main':
          return (
            <div>
                <Snackbar
                  open={this.state.open}
                  message={this.state.userCount + " users connected"}
                  autoHideDuration={3000}
                  onRequestClose={this.handleRequestClose}
                />

              <VideoEmbed winner={this.setWinner} playList={this.state.playList} upNext={this.state.upNext} getUpNext={this.getUpNext} votes={this.state.votes} startParty={this.startParty} />

              <HostVoteList votes={this.state.votes} upNext={this.state.upNext} winnerName={this.state.winnerName} />
            </div>
          )
        default:
          break;
      }
    };
  };

  switcher = (newView) => {
    this.setState({ view: newView });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      message: ''
    });
  };

  componentDidMount() {
    console.log('componentDidMount <App />');

    if (cookie.load('room')) {
      console.log('cookie exists, joining room', cookie.load('room'));
      let roomId = cookie.load('room');
      this.joinRoom(roomId);
    } else {
      this.createRoom();
    };

    this.props.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount, open: true });
    });
    this.props.ws.on('updateUpNext', (upNext) => {
      console.log('updateUpNext', upNext);
      this.setState({ upNext: upNext.data });
      this.setState({ votes: null });
      console.log('upNext', this.state.upNext);
    });
    this.props.ws.on('votes', (data) => {
      console.log('votes', data);
      let displayVotes = data.votes;
      let oldUpNext = this.state.upNext;
      let p = [];
      for (let item in displayVotes) {
        if (item) {
          p.push(displayVotes[item]);
        }
      }
      if (p.length > 2) {
        for (let i = 0; i <= 2; i++) {
          oldUpNext[i].votes = p[i].length;
        }
      }
      this.setState({ votes: data.votes, upNext: oldUpNext });
      console.log(this.state.upNext);
    });
    this.props.ws.on('updatePlaylist', (playlist) => {
      console.log('updateplaylist', playlist.data);
      this.setState({playList: playlist.data})
    });
    this.props.ws.on('sendName', (data) => {
      console.log('name', data.name);
    });
    this.props.ws.on('partyButton', (data) => {
      console.log('partyButtonCount', data.partyButtonCount, 'partyButtonCountLimit', data.partyButtonCountLimit);
    });
    this.props.ws.on('sendNewSong', (data) => {
      console.log('song', data.song, 'name', data.song.uploaderName);
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.props.ws.close();
  };

  getUpNext = () => {
    this.props.ws.emit('getUpNext');
  };

  createRoom = () => {
    this.props.ws.emit('create', (roomId) => {
      this.setState({ room: roomId });
      cookie.save('room', this.state.roomId);
    });
  };

  joinRoom = (roomId) => {
    this.props.ws.emit('joinRoom', (roomId) => {
      this.setState({ room: roomId });
    });
  };

  setWinner = (newWinner) => {
    if (!newWinner) {
      this.setState({ winnerName : "" });
      return
    }
    this.setState({ winner: newWinner });
    let upNext =  this.state.upNext;
    upNext.forEach((song) => {
      if (song.songId === newWinner) {
        this.setState({ winnerName : song.songTitle });
      };
    });
    this.props.ws.emit('newWinner', { songId: this.state.winner });
  };

  startParty = () => {
    console.log('party\'s just getting started');
    this.props.ws.emit('startParty');
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div >
          { this.renderView() }
        </div>
      </MuiThemeProvider>
    )
  };
};

export default App;
