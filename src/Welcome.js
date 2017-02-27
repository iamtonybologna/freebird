import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class Welcome extends Component {

  render() {

    return (
      <div>
        <TextField
          hintText="Clarice is that you?"
          floatingLabelText="They call me..."
        /><br/>
        <FlatButton
          label="Let's Party"
          primary={true}
          onTouchTap={this.loadUserVoteList}
        />
      </div>
    )
  }
}
