import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '90%',
    height: 'auto',
    overflowY: 'auto',
    marginBottom: '56px'
  },
  paper: {
    margin: 'auto',
    marginBottom: '56px'
  },
  snackBar: {
    marginBottom: '56px',
    zIndex: '5',
  }
};

class UserVoteList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      votedFor: '',
      newVoteId: this.props.newVoteId
    };
  }

  handleTouchTap = (newVote, newVoteId) => {
    if (this.state.newVoteId !== newVoteId) {
      this.setState({
        open: true,
        votedFor: 'Voting for ' + newVote,
        newVoteId: newVoteId
      });
    }
    this.props.voteFor(newVoteId);
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      message: ''
    });
  };

  renderIcon = (votedForId) => {
    if ( this.state.newVoteId === votedForId ) {
      return <IconButton><Star color='white' /></IconButton>
    } else {
      return <IconButton><StarBorder color='white' /></IconButton>
    }
  }
  renderShadow = (votedForId) => {
    if ( this.state.newVoteId === votedForId ) {
      return "linear-gradient(to top, #D500F9 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    } else {
      return "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          style={styles.gridList}
          cols={0.1}
        >
          {this.props.upNext.map((tile) => (
            <GridTile
              key={tile.songId}
              onTouchTap={() => this.handleTouchTap(tile.songTitle, tile.songId)}
              title={tile.songTitle}
              actionIcon={this.renderIcon(tile.songId)}
              titleBackground={this.renderShadow(tile.songId)}
            >
              <img src={tile.songImageMedium} role='presentation'/>
            </GridTile>
          ))}
        </GridList>
        <Snackbar
          open={this.state.open}
          message={this.state.votedFor}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={styles.snackBar}
        />
      </div>
    )
  };
};

export default UserVoteList;
