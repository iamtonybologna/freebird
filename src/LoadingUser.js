import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {
    margin: 'auto'
  },
};

export default class LoadingUser extends Component {

  render() {
    return (
      <div style={styles.root}>
        <CircularProgress size={80} thickness={5} /> <br/> Waiting on first vote...
      </div>
    )
  };
};
