import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Play from 'material-ui/svg-icons/av/play-arrow';

const styles = {
  gridList: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
    height: '15vw',
  },
  div: {
    position: 'relative',
    height: '0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
    width: '80vw'
  },
  image: {
    height: '100%',
    width: '100%',
    display: 'inline'
  },
  votes: {
    margin: '0'

  },
  p: {
    position: 'absolute',
    marginLeft: '3px',
    marginTop: '3px',
  }
};

class HostVoteList extends Component {

  renderShadow = (title) => {
    if ( this.props.winnerName === title ) {
      return "linear-gradient(to top, #0ff 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    } else {
      return "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    }
  }

  renderIcon = (title) => {
    if ( this.props.winnerName === title ) {
      return <IconButton><Play color='white' /></IconButton>
    }
  }

  renderSub = (title) => {
    if ( this.props.winnerName === title ) {
      return <span>Winner!</span>
    }
  }

  render() {

    return (
      <div style={styles.div}>
        <Paper zDepth={5} rounded={false} style={styles.paper}>
          <GridList cols={3} padding={0} style={styles.gridList} cellHeight={'auto'}>
            {this.props.upNext.map((tile) => (
              <GridTile
                key={tile.songId}
                title={tile.songTitle}
                titleBackground={this.renderShadow(tile.songTitle)}
                subtitle={this.renderSub(tile.songTitle)}
                actionIcon={this.renderIcon(tile.songTitle)}
              >
              <p style={styles.votes}><a style={styles.p}>{tile.votes}</a></p>
                <img role="presentation" src={tile.songImageHigh} style={styles.image}/>
              </GridTile>
            ))}
          </GridList>
        </Paper>
      </div>
    )
  };
};

export default HostVoteList;
