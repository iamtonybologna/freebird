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
    marginTop: '5%'
  },
  welText: {
    width: '70%',
  },
  paper: {
    height: '90vw',
    width: '90vw',
    display: 'inline-block',
    borderRadius: '50%',
    marginTop: '25vw',
    paddingTop: '30%',
    background: 'url("./userPlanet.png") no-repeat center center fixed',
    backgoundSize: 'cover',
  },
  floatingLabel: {
  },
};


export default class Welcome extends Component {

  render() {
    return (
      <div style={styles.welcomeDiv}>
        <Paper style={styles.paper} zDepth={5} circle={true}>
          <TextField
            inputStyle={styles.welText}
            floatingLabelStyle={styles.welText}
            textareaStyle={styles.welText}
            floatingLabelText="They call me..."
            onKeyUp={this.props.handleNewName.bind()}
          />
          <br/>
          <FloatingActionButton style={styles.welcomeButton} zDepth={5} onTouchTap={this.props.handleNewName.bind()}>
              <Send />
          </FloatingActionButton>
        </Paper>
      </div>
    )
  };
};
