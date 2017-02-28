import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
    margin: 'auto'
  },
  paper: {
    margin: 'auto'
  },
};

class UserVoteList extends Component {

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
              onTouchTap={this.props.voteFor.bind(this, tile.title)}
              title={tile.songTitle}
              actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
            >
              <img src={tile.songImageMedium} role='presentation'/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  };
};

export default UserVoteList;
