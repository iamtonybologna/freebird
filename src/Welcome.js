import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class Welcome extends Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Let's Party"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
      <Dialog
        title="Hi! What are you called?"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        <TextField
          hintText="Clarice is that you?"
          floatingLabelText="They call me..."
        />
      </Dialog>
      </div>
    )
  }
}
