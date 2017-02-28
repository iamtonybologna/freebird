import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class loadingUser extends Component {

  render() {
    return (
      <div>
        <CircularProgress size={80} thickness={5} /> <br/> Waiting on first vote...
      </div>
    )
  };
};
