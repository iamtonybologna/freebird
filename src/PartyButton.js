import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import PartyIcon from './partyIcon.js';

const styles = {
  pButton: {
    marginTop: '5vh',
    marginBottom: '5vh',
    textAlign: 'center',
    height: '60vw',
    width: '60vw',
    position: 'relative',
    marginLeft: '20vw'
  }
};

class PartyButton extends Component {
  render() {
    return (
      <IconButton style={styles.pButton} onTouchTap={this.props.handlePartyPress.bind()}>
        <PartyIcon />
      </IconButton>
    )
  };
};

export default PartyButton;
