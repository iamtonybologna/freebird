import React, {Component} from 'react';


export default class Spaceman extends Component {

  componentDidMount() {
    this.props.ws.on('updatePlaylist', () => {
     console.log("sent");
      this.testLog();
    });
  }

  testLog = () => {
    setTimeout(()=> {window.spacemanFrame = document.getElementById("spacemanFrame").contentWindow;
    window.spacemanFrame.testLog()}, 2000);
  };

  render() {
    return (
      <div>

        <iframe id="spacemanFrame" frameBorder="0"  height="500" width="500"  src="./space.html"></iframe>

      </div>
    )
  };
};