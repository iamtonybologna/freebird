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
    marginTop: '20vh',
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
    marginLeft: '30vw',
  },
  center: {
    textAlign: 'center',
  },
  underlineStyle: {
    borderColor: "linear-gradient(to top, #9C27B0 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
  },
  underlineFocusStyle: {
    borderColor: "linear-gradient(to left right, #9C27B0 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
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
                hintText="They call me..."
                onKeyUp={this.props.handleNewName.bind()}
                textareaStyle={styles.text}
                hintStyle={styles.text}
                inputStyle={styles.center}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyleFocus}
              />
              <div style={styles.welcomeButton}>
                <FloatingActionButton  style={styles.button} zDepth={2} onTouchTap={this.props.handleSubmitName.bind()}>
                    <Send />
                </FloatingActionButton>
              </div>
          </div>
        </Paper>
      </div>
    )
  };
};
