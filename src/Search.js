import React, {Component} from 'react';
import YouTubeAutocomplete from 'material-ui-youtube-autocomplete';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    margin: 'auto',
  }
};

class Search extends Component {

  selectSearch = (results) => this.props.updateSearchResultsList(results);

  render() {
    return (
      <div>
        <Paper style={styles.paper} zDepth={1}>
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
