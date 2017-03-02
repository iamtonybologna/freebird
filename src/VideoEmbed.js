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
      timeouts: {playerTimeCheck: null, playerStart: null, playerLoading: null}
    };
  };

  componentDidMount() {
    // player startup
    console.log(this.props.getUpNext);
    this.props.getUpNext();
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
            height: '432',
            width: '970',
            videoId: 'X_DVS_303kQ',
            // this starts the first player
            events: {
              'onReady': this.onPlayerReady
            }
          })
        });
        // create player two
        this.setState({
          notPlaying: new window.YT.Player('player2', {
            height: '432',
            width: '970',
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
    };
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
    this.setState({ timer: Math.floor(20 - timePlayed) });
    if (timePlayed >= 19) {
      this.state.notPlaying.cueVideoById(this.voteCalculate());
      this.state.timeouts.playerLoading = setTimeout(() => {
        this.playerStart();
      }, 10000);
    } else {
      this.state.timeouts.playerTimeCheck = setTimeout(() => {
        this.playerTimer();
      }, 1000);
    }
  };

  playerStart = () => {
    this.state.notPlaying.playVideo();
    this.state.notPlaying.setVolume(100);
    this.state.timeouts.playerStart = setTimeout(() => {
      this.playerTimeout();
    }, 5000);
  };

  playerTimeout = () => {
    let p1Hidden = "none";
    let p2Hidden = "none";
    if (this.state.player1Hidden === "none") p1Hidden = "block";
    if (this.state.player2Hidden === "none") p2Hidden = "block";
    this.setState({ player1Hidden: p1Hidden });
    this.setState({ player2Hidden: p2Hidden });
    this.state.playing.stopVideo();
    let tempPlayer = this.state.playing;
    this.setState({ playing : this.state.notPlaying });
    this.setState({ notPlaying : tempPlayer });
    this.props.getUpNext();
    this.playerTimer();
  };

  voteCalculate = () => {
    let sortArray = [];
    let votes = this.props.votes;

    for (let item in votes) {
      if (votes.hasOwnProperty(item)) {
        sortArray.push([item, this.props.votes[item].length]);
      };
    };
    if (sortArray.length === 0) {
      if (this.props.upNext.length === 0){
        return this.state.playing.getVideoData().video_id;
      }
      return this.props.upNext[0].songId;
    }
    sortArray.sort((a,b) => {
      return a[1] < b[1];
    });
    return sortArray[0][0];
  };

  gotoNextVideo = () =>{
    this.cancelTimers();
  };

  cancelTimers = () => {
    for (let timer in this.state.timeouts){
      clearTimeout(this.state.timeouts[timer]);
      console.log(timer);
    }
  };

  render() {
    return (
      <Paper style={styles.paperVid} zDepth={5} rounded={false}>
        <div>
          Time Left {this.state.timer}
          <div style={{display: this.state.player1Hidden}}>
            <Player id={"player1"}></Player>
          </div>
          <div style={{display: this.state.player2Hidden}}>
            <Player id={"player2"}></Player>
          </div>
          <button onClick={this.gotoNextVideo}>ABORT!</button>
        </div>

      </Paper>
    )
  };
};

export default VideoEmbed;
