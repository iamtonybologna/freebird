import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';

const styles = {
  div: {
    marginTop: '35vh',
    textAlign: 'center',
  },
  button: {
    height: '10vh',
    width: '10vh'
  }
};

export default class Loading extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
      return (
        <div style={styles.div}>
          <IconButton
          iconStyle={styles.button}
          onTouchTap={() => this.select('main')} >
          <Send />
          </IconButton>
        </div>
      )
  };
};
