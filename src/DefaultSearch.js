import React, {Component} from 'react';

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
            Why dont you add some music.<br/>
            Im sure everybody would looooove to hear what you like.
        </div>
    )
  };
};

export default DefaultSearch;
