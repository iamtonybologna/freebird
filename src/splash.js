import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SpaceShip from './customIcon.js';


const styles = {
  button: {
    marginTop: '0vw',
    marginRight: '10vw',
    height: '5vw',
    width: '5vw',
    display: 'inline',
  },
  welcomeButton: {
    textAlign: 'center'
  },
  paper: {
    height: '40vw',
    width: '40vw',
    display: 'inline-block',
    marginTop: '10vw',
    marginLeft: '30vw',
  },
  center: {

  },
  text: {
    margin: '0'
  },
  titleBox: {
    marginTop: '13vw'
  },
};

export default class Splash extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div style={styles.welcomeDiv} >
        <Paper style={styles.paper} zDepth={3} circle={true}>
          <div className={'sun-host'}></div>
          <div style={styles.titleBox}>
              <div style={styles.welcomeButton}>
                <p style={styles.text} className={'title'}><a>SPACE JAM</a></p>
                <IconButton style={styles.button} onTouchTap={() => this.select('loading')}>
                  <SpaceShip />
                </IconButton>
              </div>
          </div>
        </Paper>
      </div>
    )
  };
};
