
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

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws = io.connect('ws://localhost:4000');
    this.ws.emit('event', function(data) {
      console.log("Hello");
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Host/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
