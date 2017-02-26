import React, {Component} from 'react';
import Player from './Player.js';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto'
  },
  paper: {
    margin: '20px',
    display: 'flex'
  },
  paperVid: {
    margin: '20px',
    height: '450px'
  },
  video: {
    width: '100%',
    height: '450px',
    overflow: 'auto'
  }
};

class VideoEmbed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player1Hidden: "block",
      player2Hidden: "none",
      playing: null,
      notPlaying: null,
      timer: 0,
      playList: { songOne : 'Pib8eYDSFEI', songTwo: 'lgSLz5FeXUg', songThree: 'sOOebk_dKFo' },
      votes: { songOne : [], songTwo: [], songThree: [] }
    };
  };

  componentDidMount() {
    // player startup
    this.startUp();
  };

  // check if YT object exists, if it does you are safe to create players
  startUp = () => {
    if (!window.YT) {
      setTimeout(() => {
        this.startUp();
      }, 1000);
    } else {
      try {
        console.log('loaded');
        // create player one
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
        // create player two
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

  // get everything going after player1 onReady is fired
  onPlayerReady = (event) => {
    event.target.playVideo();
    event.target.setVolume(100);
    this.playerTimer();
  };

  // test for the required amount of time to have past, cue the video with 10 seconds to load
  // start playing 2 seconds before display swap
  playerTimer = () => {
    let timePlayed = this.state.playing.getCurrentTime();
    this.setState({timer: Math.floor(20 - timePlayed)});
    if (timePlayed >= 19) {
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
    }, 5000);
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

    for (let item in playList) {
      if (playList.hasOwnProperty(item)) {
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
      <Paper style={styles.paperVid} zDepth={5} rounded={false}>
      <div>
        Song one {this.state.votes.songOne.length} -
        Song two {this.state.votes.songTwo.length} -
        Song three {this.state.votes.songThree.length} -
        Time Left {this.state.timer}
        <div style={{display: this.state.player1Hidden}}>
          <Player id={"player1"}></Player>
        </div>
        <div style={{display: this.state.player2Hidden}}>
          <Player id={"player2"}></Player>
        </div>
      </div>
      </Paper>
    )
  }
}

export default VideoEmbed;
