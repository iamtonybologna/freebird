import React, {Component} from 'react';

const styles = {
  spaceUno: {
    positon: 'fixed',

  },
}

export default class Spaceman extends Component {

  componentDidMount() {
    this.props.ws.on('partyButton', (data) => {
     console.log(data);
      this.testLog(data);
    });
  }

  testLog = (data) => {

    setTimeout(()=> {window.spacemanFrame = document.getElementById("spacemanFrame").contentWindow;
    window.spacemanFrame.testLog(data)}, 1000);
  };

  render() {
    return (
      <div>
        <iframe id="spacemanFrame" frameBorder="0"  style={styles.spaceUno} height="900" width="500"  src="./space.html"></iframe>
      </div>
    )
  };
};
