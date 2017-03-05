import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Send from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';

const styles = {
  welcomeDiv: {
    textAlign: 'center'
  },
  welcomeButton: {
    marginTop: '3vh',

  },
  welText: {
    width: '70vw',
    marginTop: '15vh',
    textAlign: 'center'

  },
  paper: {
    height: '90vw',
    width: '90vw',
    display: 'inline-block',
    borderRadius: '50%',
    marginTop: '25vw',
    marginLeft: '5vw',
    background: 'url("./userPlanet.png") no-repeat center center fixed',
    backgoundSize: 'cover',
  },
  text: {
  },
};


export default class Welcome extends Component {

  render() {
    return (
      <div style={styles.welcomeDiv}>
        <Paper style={styles.paper} zDepth={3} circle={true}>
          <TextField
            style={styles.welText}
            floatingLabelText="They call me..."
            onKeyUp={this.props.handleNewName.bind()}
            textareaStyle={styles.text}
          />
          <br/>
          <FloatingActionButton style={styles.welcomeButton} zDepth={2} onTouchTap={this.props.handleNewName.bind()}>
              <Send />
          </FloatingActionButton>
          <a href="/auth/twitter">Sign in with Twitter</a>
        </Paper>
      </div>
    )
  };
};
