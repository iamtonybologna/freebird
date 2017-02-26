import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import VideoEmbed from './VideoEmbed.js';
import HostVoteList from './HostVoteList.js';



class Host extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playList: { songOne : 'Pib8eYDSFEI', songTwo: 'lgSLz5FeXUg', songThree: 'sOOebk_dKFo' },
      votes: { songOne : [], songTwo: [], songThree: [] }
    };
  };

  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    // connect to websocket server and listen for messages
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount });
    });
    this.ws.emit('youTube', 'ok');
    this.ws.on('update', (data) => {
      console.log('Received a message from the server!', data);
    });
    this.ws.on('votes', (data) => {
      console.log('votes', data);
      this.setState({ votes: data.votes});
    });
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  render() {
    return (
      <div>

          <VideoEmbed/>

        <HostVoteList/>
      <div>
        {this.state.userCount} user(s) in room
      </div>
      <div>
        <p>
          <Link to='/host'>Host Page</Link>
          <br/>
          <Link to='/users'>Users Page</Link>
        </p>
      </div>
      </div>
    );
  };
};

export default Host;
