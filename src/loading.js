import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 'auto',
  },
};

export default class Loading extends Component {

  select = (newView) => this.props.switcher(newView);

  render() {
    return (
      <div style={styles.button}>
        <CircularProgress size={80} thickness={5} />
          <RaisedButton
          label="Actually Start the Party"
          primary={true}
          onTouchTap={() => this.select('main')} />
      </div>
    )
  };
};
