# Space Jam

Space Jam is a multi-platform application that is used on both TV's/laptops and iOS/android mobile devices that can allow for easy control of a media system. Users can interact by adding and voting on songs they want to hear from their phones. We enabled users to trigger special party events from their phones by connecting an industrial smoke machine and disco balls to our server by through a Raspberry Pi and relay switch.

Space Jam was built in a Node.js environment on Javascript, Websockets, React.js, Three.js, and several APIs including YouTube and Facebook.

The Raspberry Pi script was implemented in Python.

Host page: https://node-dj.herokuapp.com/host

Add songs and vote from your phone: https://node-dj.herokuapp.com/

Open the host page on your computer, TV, or projector and full-screen the page. Open the user page on your phone or in chrome devtools mobile view. Add around 7 songs, admire the state of the art animations, and click the spaceship in the top left corner to start listening to music and voting.

## Dependencies
* cookie-parser
* cors
* express
* http
* material-ui
* material-ui-youtube-autocomplete
* node-uuid
* react
* react-cookie
* react-dom
* react-router
* react-router-dom
* react-tap-event-plugin
* react-youtube
* script-loader
* socket.io
* three
* three-json-loader
* three-obj-loader
* three-text2d
* velocity-react
* ws
