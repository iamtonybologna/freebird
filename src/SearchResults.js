import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
import PlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '13%',
    marginBottom: '15%'
  },
  gridList: {
    width: '90%',
    height: 'auto',
    overflowY: 'auto',
    margin: 'auto'
  },
  snackBar: {
  }
};


class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      songName: '',
      selectedSongs: this.props.selectedSongs,
    };
  }

  handleTouchTap = (tile) => {
    if (this.state.songName === 'Added ' + tile.snippet.title + ' to playlist') {
      this.setState({
        open: true,
        songName: 'Removed ' + tile.snippet.title + ' from playlist',
      });
    } else {
      this.setState({
        open: true,
        songName: 'Added ' + tile.snippet.title + ' to playlist',
      });
    }
    console.log(this.props)
    this.props.submitNewSong(tile)
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      message: ''
    });
  };

  renderIcon = (id) => {
      if (this.state.selectedSongs.indexOf(id) === -1 ) {
        return <IconButton><PlaylistAdd color='white' /></IconButton>
      } else {
        return <IconButton><PlaylistAddCheck color='white' /></IconButton>
      }
  }

  renderShadow = (id) => {
    if (this.state.selectedSongs.indexOf(id) === -1 ) {
      return "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    } else if (this.props.playlist.indexOf(id) === -1){
      return "linear-gradient(to top, #D500F9 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    } else {
      return "linear-gradient(to top, #76FF03 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    }
  }

  render() {
    return (
      <div style={styles.root} >
        <GridList
          style={styles.gridList}
          cols={0.1}
          padding={3}
        >
          {this.props.results.map((tile) => (

            <GridTile
              key={tile.id.videoId}
              title={tile.snippet.title}
              onTouchTap={() => this.handleTouchTap(tile)}
              actionIcon={this.renderIcon(tile.id.videoId)}
              titleBackground={this.renderShadow(tile.id.videoId)}
            >
              <img src={tile.snippet.thumbnails.medium.url} role='presentation' />
            </GridTile>

          ))}
        </GridList>
        <Snackbar
          open={this.state.open}
          message={this.state.songName}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
          style={styles.snackBar}
        />
      </div>
    )
  }
}

export default SearchResults;
