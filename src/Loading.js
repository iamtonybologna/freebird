import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  div: {
    marginTop: '35vh',
    textAlign: 'center',
  }
};

export default class Loading extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
      return (
        <div style={styles.div}>
          <RaisedButton
          label="you seem kind of cool, come party"
          primary={true}
          style={styles.button}
          onTouchTap={() => this.select('main')} />
        </div>
      )
  };
};
