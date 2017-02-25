import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import io from 'socket.io-client';
import Player from './Player.js';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  paper: {
    margin: '20px',
    display: 'flex',
  },
  paperVid: {
    margin: '20px',
    height: '450px',
  },
  video: {
    width: '100%',
    height: '450px',
    overflow: 'auto',
  }
};

const tilesData = [
  {
    img: './1.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: './2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: './3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
];




class Host extends Component {


  constructor(props) {
    super(props);
    this.state = {
      player1Hidden: "block",
      player2Hidden: "none",
      playing: null,
      notPlaying: null,
      userCount: 0
    };
  }


  componentDidMount() {
    console.log('componentDidMount <App />');
    console.log('Opening socket connection');
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({ userCount: data.userCount });
    });
    this.ws.emit('youTube', 'ok');
    this.ws.on('update', function (data) {
      console.log('Received a message from the server!', data);
    });
    this.startUp();
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };


  startUp() {
    let err = false;
    try {
      window.player1.playVideo();
    } catch (e) {
      console.log(err);
      err = true;
    }
    if (err === true) {
      setTimeout(() => {
        this.startUp();
      }, 500);
    } else {
      console.log('loaded');
      window.player1.playVideo();
      this.playerTime();
    }
  };

  playerTime() {
    let videoDuration = window.player1.getDuration();
    let timePlayed = window.player1.getCurrentTime();
    if (videoDuration - timePlayed <= 180)
    {
      this.loadPlayer();
    } else {
      setTimeout(() => {
        this.playerTime();
      }, 1000);
    }
  }

  loadPlayer() {
    window.player2.playVideo();
    window.player2.setVolume(100);
    setTimeout(() => {
      this.setState({player1Hidden: "none"});
      this.setState({player2Hidden: "block"});
      this.setState({playing: 2});
      window.player1.stopVideo();
    }, 5000);
  }


  render() {
    return (
      <div>
        <Paper style={styles.paperVid} zDepth={5} rounded={false}>
          <iframe style={styles.video} src="https://www.youtube.com/embed/6NXnxTNIWkc?ecver=1" frameBorder='0' allowFullScreen></iframe>
        </Paper>
        <Paper style={styles.paper} zDepth={5} rounded={false}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile) => (
              <GridTile
                key={tile.img}
                title={tile.title}
                actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}

                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img role="presentation" src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </Paper>
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
      <div style={{display: this.state.player1Hidden}}>
        <Player id={"player1"}></Player>
      </div>
      <div style={{display: this.state.player2Hidden}}>
        <Player id={"player2"}></Player>
      </div>
    </div>
    )
  }
}

export default Host;
