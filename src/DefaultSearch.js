import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const styles = {
  noSearchDiv: {
    marginTop: '50%',
    width: '90%',
    marginLeft: '5%',
    zIndex: '5',
    textAlign: 'center'
  },
};

class DefaultSearch extends Component {

  render() {
    return (
        <div style={styles.noSearchDiv} >
        </div>
    )
  };
};

export default DefaultSearch;
