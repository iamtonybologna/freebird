import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import SpaceShip from './customIcon.js';

const styles = {
  div: {
  },
  button: {
    height: '10vh',
    width: '10vh'
  },
  pre: {
    textAlign: 'center'
  }
};

export default class Loading extends Component {

  select = (newView) => this.props.switcher(newView);

  gatekeeper = () => {
    if (this.props.playList.length > 6) {
      return (
        <div style={styles.div}>
        <IconButton
            iconStyle={styles.button}
            onTouchTap={() => this.select('main')} >
            <SpaceShip />
          </IconButton>
        </div>
      )
    } else {
      return (
        <div>
          <p style={styles.pre}><a>Waiting for songs...</a></p>
        </div>
      )
    }
  }

  render() {
      return (
        <div>
          { this.gatekeeper() }
        </div>
      )
  };
};
