import React, {Component} from 'react';

const styles = {
  player: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
}


class Player extends Component {

  render() {
    return (
      <div id={this.props.id} style={styles.player}>
      </div>
    )
  };
};
export default Player;
