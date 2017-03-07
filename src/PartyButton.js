import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    marginTop: '30px',
    marginBottom: '30px',
  }
};

class PartyButton extends Component {
  render() {
    return (
      <RaisedButton label="Party Button" primary={true} fullWidth={true} style={styles.button} onTouchTap={this.props.handlePartyPress.bind()} />
    )
  };
};

export default PartyButton;
