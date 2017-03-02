import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
  },
};

export default class Splash extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div>
        <RaisedButton
        label="Start Party"
        primary={true}
        style={styles.button}
        onTouchTap={() => this.select('loading')} />
      <div>helo</div>
      </div>
    )
  };
};
