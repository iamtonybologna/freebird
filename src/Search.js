import React, {Component} from 'react';
import YouTubeAutocomplete from 'material-ui-youtube-autocomplete';



class Search extends Component {


  selectSearch = (results) => this.props.updateSearchResultsList(results);



  render() {

    return (
      <div>
        <YouTubeAutocomplete
           apiKey="AIzaSyCxZrHtU_wXNdakFMEiceOirp-xpxOIMLo"
           placeHolder="insert heater here..."
           maxResults="10"
           callback={this.selectSearch}
         />
      </div>
    )
  }
}

export default Search;
