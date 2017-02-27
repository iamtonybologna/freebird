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
  }
};


class SearchResults extends Component {

  render() {
    return (
      <div style={styles.root}>
        <GridList
          style={styles.gridList}
          cols={0.1}
        >
          {this.props.results.map((tile) => (
            <GridTile
              key={tile.id.videoId}
              title={tile.snippet.title}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.snippet.thumbnails.medium.url} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default SearchResults;
