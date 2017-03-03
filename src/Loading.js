import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    textAlign: 'center',
    marginTop: '50vh'
  },
};

export default class Loading extends Component {

  select = (newView) => this.props.switcher(newView);



  render() {
      return (
        <div style={styles.button}>
            <RaisedButton
            label="you seem kind of cool, come party"
            primary={true}
            onTouchTap={() => this.select('main')} />
        </div>
      )
  };
};
