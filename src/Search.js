import React, {Component} from 'react';
import YouTubeAutocomplete from 'material-ui-youtube-autocomplete';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    top: '0',
    right: '0',
    left: '0',
    position: 'fixed',
    zIndex: '10'
  }
};

class Search extends Component {

  selectSearch = (results) => this.props.updateSearchResultsList(results);

  render() {
    return (
        <div style={styles.paper} >
          <Paper zDepth={1}>
            <YouTubeAutocomplete
               apiKey="AIzaSyCxZrHtU_wXNdakFMEiceOirp-xpxOIMLo"
               placeHolder="insert heater here..."
               maxResults="10"
               callback={this.selectSearch}
             />
          </Paper>
        </div>
    )
  };
};

export default Search;
