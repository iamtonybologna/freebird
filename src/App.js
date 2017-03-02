import React, { Component } from 'react';
import './App.css';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';
import VideoEmbed from './VideoEmbed.js';
import HostVoteList from './HostVoteList.js';
import Splash from './splash.js';
import Loading from './Loading.js';

const config   = require('../config');

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playList: { songOne : 'Pib8eYDSFEI', songTwo: 'lgSLz5FeXUg', songThree: 'sOOebk_dKFo' },
      votes: { songOne : [], songTwo: [], songThree: [] },
      view: 'splash',
      upNext: []
    };

    this.renderView = () => {
      switch(this.state.view) {
        case 'splash':
          return <Splash switcher={this.switcher}/>
        case 'loading':
          return <Loading switcher={this.switcher} upNext={this.state.upNext}/>
        case 'main':
          return (
            <div>
              <VideoEmbed playList={this.state.playList} upNext={this.state.upNext} getUpNext={this.getUpNext} votes={this.state.votes} />
              <HostVoteList votes={this.state.votes} upNext={this.state.upNext} />
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

    this.ws = io.connect(`${config.HOST}:${config.PORT}`);

    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount });
    });
    this.ws.on('votes', (data) => {
      console.log('votes', data);
      this.setState({ votes: data.votes });
    });
    this.ws.on('updateUpNext', (upNext) => {
      console.log('updateUpNext', upNext);
      this.setState({ upNext: upNext.data });
      console.log('upNext', this.state.upNext);
    });
    this.ws.on('updatePlaylist', (playlist) => {
      console.log('updateplaylist', playlist.data);
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  getUpNext = () => {
    this.ws.emit('getUpNext');
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          { this.renderView() }
        </div>
      </MuiThemeProvider>
    )
  };
};

export default App;
