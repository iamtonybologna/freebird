# Freebird
=====================
Playlist Voting App Using Node.js, React, and Websockets

Host page: https://desolate-temple-13043.herokuapp.com/host

Mobile user page: https://desolate-temple-13043.herokuapp.com/users

Open the host page on the main computer, TV, or projector. Open the user page on your phone, or in chrome devtools mobile view (⌘ + ⇧ + M). Add 12 songs to enter the host page and start the party.

Hidden feature: raspberry pi configured to send GET requests to "/party" switches relay connected to smoke machine, disco balls, and lights. Martini glass button on host page activates the "party button" on users' pages, which trips the raspberry pi and relay after the party button is hit a certain amount of times.

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
