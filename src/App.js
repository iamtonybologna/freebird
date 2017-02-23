
import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Host from './Host.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

class App extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Host/>
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;
