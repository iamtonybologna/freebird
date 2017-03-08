import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    width: '40vw',
    margin: 'auto',
    marginTop: '30vh',
    paddingBottom: '5vh',
    paddingTop: '5vh',
  },
  noSearchDiv: {
    zIndex: '5',
    textAlign: 'center',
  },
};

export default class Splash extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div style={styles.noSearchDiv}>
        <Paper zDepth={5} style={styles.paper}>
          <p><a>Not Freebird</a></p>
          <div style={styles.button}>
              <RaisedButton
              label="Are you ready for ze party ???"
              primary={true}
              onTouchTap={() => this.select('loading')}/>
          </div>
        </Paper>
      </div>
    )
  };
};
