import React, { Component } from 'react';

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

const styles = {
    container: {
      height: '100vh',
      width: '100vw'
    }
  };
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      votes: null,
      view: 'splash',
      upNext: [{songId: 'X_DVS_303kQ'}],
      winner: '',
    };

    this.renderView = () => {
      switch(this.state.view) {
        case 'splash':
          return <Splash switcher={this.switcher} />
        case 'loading':
              return <Loading switcher={this.switcher} upNext={this.state.upNext} />
        case 'main':
          return (
            <div>
              <VideoEmbed winner={this.setWinner} playList={this.state.playList} upNext={this.state.upNext} getUpNext={this.getUpNext} votes={this.state.votes} />
              <HostVoteList votes={this.state.votes} upNext={this.state.upNext} winner={this.state.winner}/>
              {this.state.userCount} user(s) in room
            </div>
          )
        default:
          break;
      }
    };
  };

  switcher = (newView) => {
    this.setState({ view: newView });
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');

    this.props.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount });
    });
    this.props.ws.on('votes', (data) => {
      console.log('votes', data);
      this.setState({ votes: data.votes });
    });
    this.props.ws.on('updateUpNext', (upNext) => {
      console.log('updateUpNext', upNext);
      this.setState({ upNext: upNext.data });
      this.setState({ votes: null});
      console.log('upNext', this.state.upNext);
    });
    this.props.ws.on('updatePlaylist', (playlist) => {
      console.log('updateplaylist', playlist.data);
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.props.ws.close();
  };

  getUpNext = () => {
    this.props.ws.emit('getUpNext');
  };

  setWinner = (newWinner) => {
    this.setState({ winner: newWinner });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          { this.renderView() }
        </div>
      </MuiThemeProvider>
    )
  };
};

export default App;
