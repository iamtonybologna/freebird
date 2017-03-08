import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  loadingUser: {
    marginTop: '10vh',
    textAlign: 'center',
  }
};

export default class LoadingUser extends Component {

  render() {
    return (
      <div style={styles.loadingUser}>
        <CircularProgress size={200} secondary={true} thickness={10} />
        <p><a>Waiting on our first playlist</a></p>
      </div>
    )
  };
};
