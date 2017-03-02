import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Send from 'material-ui/svg-icons/content/send';

const styles = {
  welcomeDiv: {
    marginTop: '50%',
    textAlign: 'center',
  },
  welcomeButton: {
    marginTop: '5%'
  }
};

export default class Welcome extends Component {

  render() {
    return (
      <div style={styles.welcomeDiv}>
        <TextField
          hintText="Clarice is that you?"
          floatingLabelText="They call me..."
          onKeyUp={this.props.handleNewName.bind()}
        />
      <br/>
      <FloatingActionButton secondary={true} style={styles.welcomeButton} onTouchTap={this.props.handleNewName.bind()}>
          <Send />
      </FloatingActionButton>
      </div>
    )
  };
};
