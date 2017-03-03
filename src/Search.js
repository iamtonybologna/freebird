import React, {Component} from 'react';
import YouTubeAutocomplete from 'material-ui-youtube-autocomplete';
import Paper from 'material-ui/Paper';

const styles = {
  searchDiv: {
    top: '0',
    marginLeft: '2.5%',
    width: '95%',
    position: 'fixed',
    zIndex: '5'
  },
  paper: {
    textAlign: 'center'
  }
};

class Search extends Component {

  selectSearch = (results) => this.props.updateSearchResultsList(results);

  render() {
    return (
        <div style={styles.searchDiv} >
          <Paper zDepth={3} rounded={true} style={styles.paper}>
            <YouTubeAutocomplete
               apiKey="AIzaSyCxZrHtU_wXNdakFMEiceOirp-xpxOIMLo"
               maxResults="10"
               callback={this.selectSearch}
             />
          </Paper>
        </div>
    )
  };
};

export default Search;
