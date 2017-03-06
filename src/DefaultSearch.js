import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const styles = {
  noSearchDiv: {
    marginTop: '30vh',
    width: '90vw',
    marginLeft: '5vw',
    zIndex: '5',
    textAlign: 'center'
  },
};

class DefaultSearch extends Component {

  render() {
    return (
      <div>
        <Paper zDepth={5} style={styles.noSearchDiv}>
          "Add some music to the playlist while it loads!"
        </Paper>
      </div>
    )
  };
};

export default DefaultSearch;
