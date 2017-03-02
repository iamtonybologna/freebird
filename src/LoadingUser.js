import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  loadingUser: {
    marginTop: '50%',
    textAlign: 'center',
  }
};

export default class LoadingUser extends Component {

  render() {
    return (
      <div style={styles.loadingUser}>
        <CircularProgress size={120} thickness={5} />
      </div>
    )
  };
};
