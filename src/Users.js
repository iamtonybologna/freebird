import React, { Component } from 'react';
import './Users.css';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import Welcome from './Welcome.js';
import UserVoteList from './UserVoteList.js';
import Search from './Search.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  }
});

class Users extends Component {

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');
  }

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  }

  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      searchResults: [],
    };

  };


  updateSearchResultsList = (results) => {
    this.setState({searchResults: results})
  }



  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
        <Welcome/>
        <Search updateSearchResultsList={this.updateSearchResultsList}/>
        <UserVoteList/>

      </div>
      </MuiThemeProvider>
    );
  }
}

export default Users;
