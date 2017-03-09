import React, {Component} from 'react';
import Up from 'material-ui/svg-icons/navigation/arrow-upward';

const styles = {
  noSearchDiv: {
    marginTop: '15vh',
    zIndex: '5',
    textAlign: 'center',
  },
  up: {
    height: '25vh',
    width: '25vh'
  }
};

class DefaultSearch extends Component {

  render() {
    return (
      <div style={styles.noSearchDiv}>
          <p><a><Up style={styles.up}/><br />Add some music!</a></p>
      </div>
    )
  };
};

export default DefaultSearch;
