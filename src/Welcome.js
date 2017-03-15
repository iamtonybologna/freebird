import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SpaceShip from './customIcon.js';

const styles = {
  button: {
    marginTop: '1vw',
    height: '20vw',
    width: '20vw'
  },
  welcomeButton: {
    marginLeft: '25vw',
    height: '20vw',
    width: '20vw'
  },
  welText: {
    width: '90vw',
    marginTop: '35vw',
    textAlign: '',
    fontSize: '1.5em'
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
    marginLeft: '26vw',
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
                hintText="they call me..."
                onKeyUp={this.props.handleNewName.bind()}
                textareaStyle={styles.text}
                hintStyle={styles.text}
                inputStyle={styles.center}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyleFocus}
              />
              <div style={styles.welcomeButton}>
                <IconButton iconStyle={styles.button} onTouchTap={this.props.handleSubmitName.bind()}>
                    <SpaceShip />
                </IconButton>
              </div>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/>
              <div>
                <a href="/login/facebook">Log In with Facebook</a>
              </div>
              <br/>
              <div>
                Username: {}
                Facebook ID:
              </div>
          </div>
        </Paper>
      </div>
    )
  };
};
