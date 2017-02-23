import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Host from './Host.js';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }


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
