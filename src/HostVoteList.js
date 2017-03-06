import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

const styles = {
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    height: '100%',
    width: '100%'
  },
  paper: {
    display: 'flex',
    height: '28vh',
    width: '100%'
  },
};

class HostVoteList extends Component {



  render() {

    return (
      <Paper style={styles.paper} zDepth={5} rounded={false}>
        <GridList style={styles.gridList} cols={1.2} cellHeight={'auto'} padding={0}>
          {this.props.upNext.map((tile) => (
            <GridTile
              key={tile.songId}
              title={tile.songTitle}
              style={styles.tile}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img role="presentation" src={tile.songImageHigh}/>
            </GridTile>
          ))}
        </GridList>
      </Paper>
    )
  };
};

export default HostVoteList;
