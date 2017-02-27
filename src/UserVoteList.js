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

const tilesData = [
  {
    img: './1.jpg',
    title: 'Breakfast',
    author: 'jill111'
  },
  {
    img: './2.jpg',
    title: 'Tasty burger',
    author: 'pashminu'
  },
  {
    img: './3.jpg',
    title: 'Camera',
    author: 'Danson67'
  },
];

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
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.songImageMedium} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  };
};

export default UserVoteList;
