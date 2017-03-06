import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    textAlign: 'center',
    marginTop: '50vh'
  },
};

export default class Splash extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div style={styles.button}>
          <RaisedButton
          label="Are you ready for ze party ???"
          primary={true}
          onTouchTap={() => this.select('loading')} />
      </div>

    )
  };
};
