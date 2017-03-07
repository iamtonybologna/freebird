import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Send from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';

const styles = {
  button: {
    marginTop: '3vh'
  },
  welcomeButton: {
    textAlign: 'center',
    margin: 'auto',
  },
  welText: {
    width: '90vw',
    marginTop: '15vh',
    textAlign: 'center',
  },
  paper: {
    height: '90vw',
    width: '90vw',
    display: 'inline-block',
    marginTop: '25vw',
    marginLeft: '5vw',
  },
  text: {
    textAlign: 'center',
    marginLeft: '30vw'
  },
  center: {
    textAlign: 'center',
  }
};


export default class Welcome extends Component {

  render() {
    return (
      <div style={styles.welcomeDiv} >
        <Paper style={styles.paper} zDepth={3} circle={true}>
          <div><div className={'sun'}></div>
              <TextField
                style={styles.welText}
                floatingLabelText="They call me..."
                onKeyUp={this.props.handleNewName.bind()}
                textareaStyle={styles.text}
                hintStyle={styles.text}
                floatingLabelStyle={styles.text}
                inputStyle={styles.center}
                floatingLabelFocusStyle={styles.text}
              />
              <div style={styles.welcomeButton}>
                <FloatingActionButton style={styles.button} zDepth={2} onTouchTap={this.props.handleSubmitName.bind()}>
                    <Send />
                </FloatingActionButton>
              </div>
          </div>
        </Paper>
      </div>
    )
  };
};
