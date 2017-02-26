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
      userCount: 0,
      timer: 0,
      playList: {songOne : 'Pib8eYDSFEI', songTwo: 'lgSLz5FeXUg', songThree: 'sOOebk_dKFo'},
      votes: {songOne : [], songTwo: [], songThree: []}
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
    this.ws.on('update', (data) => {
      console.log('Received a message from the server!', data);
    });
    this.ws.on('votes', (data) => {
      console.log('votes', data);
      this.setState({ votes: data.votes});
    });
    //player startup
    this.startUp();
  };

  componentWillUnmount() {
    console.log('Closing socket connection');
    this.ws.close();
  };

  //check if YT object exists, if it does you are safe to create players
  startUp = () => {
    if (!window.YT) {
      setTimeout(() => {
        this.startUp();
      }, 1000);
    } else {
      try {
        console.log('loaded');
        //create player one
        this.setState({
          playing: new window.YT.Player('player1', {
            height: '390',
            width: '640',
            videoId: 'hqJKZVnNLT0',
            //this start the first player
            events: {
              'onReady': this.onPlayerReady
            }
          })
        });
        //create player two
        this.setState({
          notPlaying: new window.YT.Player('player2', {
            height: '390',
            width: '640',
            videoId: 'mSLqhZk-hA4'
          })
        });
      }
      catch (e) {
        console.log(e);
        setTimeout(() => {
        this.startUp();
       }, 1000);
      }
    }
  };

  //get everything going after player1 onReady is fired
  onPlayerReady = (event) => {
    event.target.playVideo();
    event.target.setVolume(100);
    this.playerTimer();
  };

  //test for the required amount of time to have past, cue the video with 10 seconds to load
  //start playing 2 seconds before display swap
  playerTimer = () => {
    let timePlayed = this.state.playing.getCurrentTime();
    this.setState({timer: Math.floor(20 - timePlayed)});
    if ( timePlayed >= 19)
    {
      this.state.notPlaying.cueVideoById(this.voteCalculate());
      setTimeout(() => {
        this.playerStart();
      }, 10000);
    } else {
      setTimeout(() => {
        this.playerTimer();
      }, 1000);
    }
  };

  playerStart = () => {
    this.state.notPlaying.playVideo();
    this.state.notPlaying.setVolume(100);
    setTimeout(() => {
      this.playerTimeout();
    }, 5000)
  };

  playerTimeout = () => {
    let p1Hidden = "none";
    let p2Hidden = "none";
    if (this.state.player1Hidden === "none") p1Hidden = "block";
    if (this.state.player2Hidden === "none") p2Hidden = "block";
    this.setState({player1Hidden: p1Hidden});
    this.setState({player2Hidden: p2Hidden});
    this.state.playing.stopVideo();
    let tempPlayer = this.state.playing;
    this.setState({playing : this.state.notPlaying});
    this.setState({notPlaying : tempPlayer});
    this.playerTimer();
  };


voteCalculate = () =>{
  let sortArray = [];
  let playList = this.state.playList;

  for (let item in playList){
    if (playList.hasOwnProperty(item)){
      sortArray.push([item, playList[item], this.state.votes[item].length]);
    }
  }
  sortArray.sort((a,b) => {
    return a[2] < b[2];
  });
  return sortArray[0][1];
};


  render() {
    return (
      <div>
        <Paper style={styles.paperVid} zDepth={5} rounded={false}>
          Song one {this.state.votes.songOne.length}
          Song two {this.state.votes.songTwo.length}
          Song three {this.state.votes.songThree.length}
          Time Left{this.state.timer}

          <div style={{display: this.state.player1Hidden}}>
            <Player id={"player1"}></Player>
          </div>
          <div style={{display: this.state.player2Hidden}}>
            <Player id={"player2"}></Player>
          </div>
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
      </div>
    )
  }
}

export default Host;
