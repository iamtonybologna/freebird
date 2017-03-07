import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  image: {
    height: '20vh'
  },
  div: {
    marginTop: '10px'
  },
  paper: {
    width: '100%',
    height: '56.25%'
  }
};

class HostVoteList extends Component {



  render() {

    return (
      <div style={styles.div}>
        <GridList cols={3} cellHeight={'auto'} padding={5} style={styles.gridList}>
          {this.props.upNext.map((tile) => (
            <Paper zDepth={5} rounded={false} style={styles.paper}>
              <GridTile
                key={tile.songId}
                title={tile.songTitle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img role="presentation" src={tile.songImageHigh} style={styles.image}/>
              </GridTile>
            </Paper>
          ))}
        </GridList>
      </div>
    )
  };
};

export default HostVoteList;
