import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  button: {

  },
  noSearchDiv: {
    marginTop: '20vh',
    width: '30vw',
    height: '50vh',
    zIndex: '5',
    textAlign: 'center',
    paddingTop: ''
  },
};

export default class Splash extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div className="container">
        <Paper zDepth={5} style={styles.noSearchDiv}>
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
