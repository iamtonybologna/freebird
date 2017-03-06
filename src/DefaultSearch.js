import React, {Component} from 'react';

const styles = {
  noSearchDiv: {
    marginTop: '20vh',
    zIndex: '5',
    textAlign: 'center',
  },
};

class DefaultSearch extends Component {

  render() {
    return (
      <div style={styles.noSearchDiv}>
          <p><a>Add some music!</a></p>
      </div>
    )
  };
};

export default DefaultSearch;
