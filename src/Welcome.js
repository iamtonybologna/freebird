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
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
  },
  paper: {
    height: '90vw',
    width: '90vw',
    display: 'inline-block',
    borderRadius: '50%',
    marginTop: '25vw',
    marginLeft: '5vw',
    background: 'url("./sun.png") no-repeat center center fixed',
    backgoundSize: 'cover',
    borderRadius: '50%',
  },
  text: {
    textAlign: 'center'
  },
};


export default class Welcome extends Component {

  render() {

    return (

      <div style={styles.welcomeDiv} >
        <Paper style={styles.paper} zDepth={3} circle={true}>
          <TextField
            style={styles.welText}
            floatingLabelText="They call me..."
            onKeyUp={this.props.handleNewName.bind()}
            textareaStyle={styles.text}
          />
          <br/>
          <div style={styles.welcomeButton}>
            <FloatingActionButton  style={styles.button} zDepth={2} onTouchTap={this.props.handleSubmitName.bind()}>
                <Send />
            </FloatingActionButton>
          </div>
        </Paper>
      </div>
    )
  };
};
