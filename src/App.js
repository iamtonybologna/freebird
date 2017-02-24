
import React, { Component } from 'react';
import './App.css';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Host from './Host.js';

const ws        = new WebSocket('ws://localhost:4000');
const muiTheme  = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

class App extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    ws.addEventListener('open', (event) => {
      console.log("Connected to WS Server.");
    });

    // New message
    ws.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      let type = data.type;
      switch(type) {
        case "updateUserCount":
          console.log(`Received from server: ${event.data}`);
          this.setState({ userCount: data.userCount });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    });

    ws.addEventListener('error', (error) => {
      console.log(`Error: ${error}`);
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    ws.close();
  };

  constructor(props) {
    super(props);
    this.state = {
      userCount: 0
    };
  };

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
}

export default App;
