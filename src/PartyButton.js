import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Party from 'material-ui/svg-icons/social/whatshot';

const styles = {
  button: {
    marginTop: '10vh',
    marginBottom: '10vh',
    textAlign: 'center'
  }
};

class PartyButton extends Component {
  render() {
    return (
      <FloatingActionButton label="Party Button" secondary={true} style={styles.button} onTouchTap={this.props.handlePartyPress.bind()}>
        <Party />
      </FloatingActionButton>
    )
  };
};

export default PartyButton;
