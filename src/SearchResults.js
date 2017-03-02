import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '6%',
    marginBottom: '20%'
  },
  gridList: {
    width: '90%',
    height: 'auto',
    overflowY: 'auto',
    margin: 'auto'
  },
  paper: {
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
            <Paper zDepth={5} rounded={true} style={styles.paper}>
            <GridTile
              key={tile.id.videoId}
              title={tile.snippet.title}
              onTouchTap={this.props.submitNewSong.bind(this, tile)}
              actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
            >
              <img src={tile.snippet.thumbnails.medium.url} role='presentation' />
            </GridTile>
            </Paper>
          ))}
        </GridList>
      </div>
    )
  }
}

export default SearchResults;
