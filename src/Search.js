import React, {Component} from 'react';
import YouTubeAutocomplete from 'material-ui-youtube-autocomplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}

class Search extends Component {
  state = {
    open: false,
    openResults: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpenResults = () => {
    this.setState({openResults: true});
  };

  handleCloseResults = () => {
    this.setState({openResults: false});
  };

  _onSearchResultsFound(results) {
    this.props.updateSearchResultsList(results)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
      <FloatingActionButton
        onTouchTap={this.handleOpen}
        style={styles.root}
        >
        <ContentAdd />
      </FloatingActionButton>
      <Dialog
          title="hit them with a banger"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <YouTubeAutocomplete
           apiKey="AIzaSyCxZrHtU_wXNdakFMEiceOirp-xpxOIMLo"
           placeHolder="insert heater here..."
           maxResults="10"
           callback={this._onSearchResultsFound, this.handleClose, this.handleOpenResults}
         />
      </Dialog>

      </div>
    )


  }

}

export default Search;
