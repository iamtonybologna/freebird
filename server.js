const express   = require('express');
const cors      = require('cors');
const http      = require('http');
const app       = express();

app.use(cors());

const server    = require('http').createServer(app);
const io        = require('socket.io')(server);
const uuid      = require('node-uuid');

io.origins('*:*');

app.use(express.static(`${__dirname}/build/static`));

app.use((req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

server.listen(4000);
console.log('Server listening on port 4000');

let initializing = true;
let userCount = 0;
let usernames = {};
let votes = {};
let upNext = [];
let playlist = [];

io.on('connection', (client) => {

  console.log('New Client Connected');
  userCount++;
  console.log(userCount + ' clients connected!');
  io.emit('updateUserCount', { userCount: userCount });

  // set username
  client.on('setUsername', (user) => {
    console.log('Received username from client', user);
    let id = uuid.v1();
    usernames[id] = user.name;
    console.log('New user added to usernames', usernames);
    io.emit('setUsername', { id: id, name: user.name });
    io.emit('checkForUpNext', { upNext: upNext });
  });

  // voting
  // votes = { songId: [userId, userId, userId] }
  // vote = { userId: , songId: }
  client.on('setUserVote', (vote) => {
    console.log('Received vote from client', vote);
    // remove vote if user has already voted on a song
    for (let song in votes) {
      if (votes[song].indexOf(vote.userId) > -1) {
        let index = votes[song].indexOf(vote.userId);
        votes[song].splice(index, 1);
      };
    };
    votes[vote.songId].push(vote.userId);
    io.emit('votes', { votes: votes });
    console.log('Updated votes', votes);
  });

  // add new song
  client.on('addNewSong', (songData) => {
    console.log('Received new song from client', songData);
    let newSong = {
      uploader: songData.userId,
      songId: songData.songId,
      songTitle: songData.songTitle,
      songImageMedium: songData.songImageMedium,
      songImageHigh: songData.songImageHigh,
      upNext: false
    };

    // check if song is in playlist
    let songInPlaylist = false;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].songId === newSong.songId) {
        songInPlaylist = true;
      };
    };
    // if song is not in playlist, add to playlist
    if (!songInPlaylist) {
      playlist.push(newSong);
      if (initializing) {
        console.log('Broadcasting playlist data');
        io.emit('updatePlaylist', { data: playlist });
      };
    };
  });

  // grab 3 random songs from playlist, add to voting list, send to host and users
  client.on('getUpNext', () => {
    upNext = [];
    votes = {};
    let newSongs = {};
    let i = 0;
    if (playlist.length > 2) {
      while (i < 3) {
        let randomSong = playlist[Math.floor(Math.random() * playlist.length)];
        if (newSongs.hasOwnProperty(randomSong.songId) === false) {
          newSongs[randomSong.songId] = randomSong;
          i++;
        };
      };
      for (let song in newSongs) {
        upNext.push(newSongs[song]);
        votes[song] = [];
      };
      console.log('Broadcasting new upNext list', upNext);
      io.emit('updateUpNext', { data: upNext });
    };
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
    userCount--;
    console.log(userCount + ' clients connected!');
    io.emit('updateUserCount', { userCount: userCount });
  });

});
