import React, {Component} from 'react';
import Player from './Player.js';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Skip from 'material-ui/svg-icons/av/skip-next';
import Drink from 'material-ui/svg-icons/maps/local-bar';

const styles = {
  paper: {
    width: '70vw',
    marginLeft: '15vw'
  },
  videoWrapper: {
    position: 'relative',
    height: '0',
    overflow: 'hidden',
    paddingBottom: '56.25%',
  },
  button: {
    float: 'right',
    top: '0'
  },
  partyButton: {
    float: 'left',
    top: '0'
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

    this.problemCounter = 0;
    this.bufferCounter = 0;
    this.backgroundVideoLoading = false;
  };

  componentDidMount() {
    // player startup
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
    ;
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
    console.log(this.state.playing.getPlayerState(), timePlayed, 'playerStatus');
    switch (this.state.playing.getPlayerState()) {
      case -1:
        this.problemCounter++;
        if (this.problemCounter >= 5) {
          this.gotoNextVideo();
        }
        break;
      case 0:
        this.gotoNextVideo();
        return;
      case 1:
        this.problemCounter = 0;
        this.bufferCounter = 0;
        break;
      case 2:
        break;
        this.problemCounter = 0;
        this.bufferCounter = 0;
      case 3:
        this.bufferCounter++;
        if (this.bufferCounter >= 15) {
          this.gotoNextVideo();
        }
        break;
      case 5:
        this.state.playing.playVideo();
        this.problemCounter = 0;
        this.bufferCounter = 0;
        break;
      default:
        break;
    }


    if (timePlayed >= 19) {
      let newWinner = this.voteCalculate();
      this.props.winner(newWinner);
      this.state.notPlaying.cueVideoById(this.voteCalculate());
      console.log('Winner should be played next:', this.voteCalculate());
      this.backgroundVideoLoading = true;
      this.state.timeouts.playerLoading = setTimeout(() => {
        this.playerStart(500);
      }, 10000);
    } else {
      this.state.timeouts.playerTimeCheck = setTimeout(() => {
        this.playerTimer();
      }, 1000);
    }
  };

  playerStart = (delay) => {
    this.state.notPlaying.playVideo();
    this.state.notPlaying.setVolume(100);
    this.state.timeouts.playerStart = setTimeout(() => {
      this.playerTimeout();
    }, delay);
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
    this.setState({playing: this.state.notPlaying});
    this.setState({notPlaying: tempPlayer});
    this.playerVolumeSync();
    this.setState({votes: null});
    this.props.getUpNext();
    this.backgroundVideoLoading = false;
    this.playerTimer();
    console.log("should be playing", this.state.playing.getVideoUrl(), "was playing", this.state.notPlaying.getVideoUrl())
  };

  playerVolumeSync() {
    console.log(this.state.notPlaying.getVolume(), "volume");
    this.state.playing.setVolume(this.state.notPlaying.getVolume());
    if (this.state.notPlaying.isMuted() === true) {
      this.state.playing.mute();
    } else {
      this.state.playing.unMute();
    }
  }

  voteCalculate = () => {
    let sortArray = [];
    let votes = this.props.votes;

    for (let item in votes) {
      if (votes.hasOwnProperty(item)) {
        sortArray.push([item, this.props.votes[item].length]);
      }
    }
    if (sortArray.length === 0) {
      return this.props.upNext[0].songId;
    }
    sortArray.sort((a, b) => {
      return a[1] < b[1];
    });
    return sortArray[0][0];
  };

  gotoNextVideo = () => {
    this.cancelTimers();
    if (!this.backgroundVideoLoading) {
      this.state.notPlaying.cueVideoById(this.voteCalculate());
    }
    console.log(this.backgroundVideoLoading, 'background');
    this.playerStart(500);

  };

  cancelTimers = () => {
    for (let timer in this.state.timeouts) {
      clearTimeout(this.state.timeouts[timer]);
    }
  };

  render() {
    return (
      <div>
        <FloatingActionButton onTouchTap={this.gotoNextVideo} style={styles.button}>
          <Skip />
        </FloatingActionButton>
        <FloatingActionButton onTouchTap={this.props.startParty.bind()} style={styles.partyButton}>
          <Drink/>
        </FloatingActionButton>
        <Paper zDepth={5} rounded={true} style={styles.paper}>
          <div style={styles.videoWrapper}>
            <div style={{display: this.state.player1Hidden}}>
              <Player id={"player1"}></Player>
            </div>
            <div style={{display: this.state.player2Hidden}}>
              <Player id={"player2"}></Player>
            </div>
          </div>
        </Paper>
      </div>
    )
  };
}
;

export default VideoEmbed;
