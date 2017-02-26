import React, { Component } from 'react';
import './App.css';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Host from './Host.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Host/>
          {/* NavBar */}
          {/* VideoEmbed */}
          {/* HostVoteList */}
        </div>
      </MuiThemeProvider>
    );
  };
};

export default App;