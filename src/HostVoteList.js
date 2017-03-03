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
    width: '100vw'
  },
  paper: {
    display: 'flex',
    height: '34.75%'
  },
};

class HostVoteList extends Component {
  render() {
    return (
      <Paper style={styles.paper} zDepth={5} rounded={false}>
        <GridList style={styles.gridList} cols={1.2} padding={0}>
          {this.props.upNext.map((tile) => (
            <GridTile
              key={tile.songId}
              title={tile.songTitle}
              actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
            >
              <img role="presentation" src={tile.songImageHigh} />
            </GridTile>
          ))}
        </GridList>
      </Paper>
    )
  };
};

export default HostVoteList;
