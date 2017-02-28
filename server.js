const express   = require('express');
const cors      = require('cors');
const http      = require('http');
const app       = express();
app.use(cors());
const server    = require('http').createServer(app);
const io        = require('socket.io')(server);
const uuid      = require('node-uuid');

io.origins('*:*');

server.listen(4000);
console.log('Server listening on port 4000');

let initializing = true;
let userCount = 0;
let usernames = {};
let votes = {
  songOne: [],
  songTwo: [],
  songThree: []
};
let upNext = [];
let playlist = [];

io.on('connection', (client) => {

  console.log('New Client Connected');
  userCount ++;
  console.log(userCount + ' clients connected!');
  io.emit('updateUserCount', { userCount: userCount });

  client.on('setUsername', (user) => {
    console.log('Received username from client', user);
    let id = uuid.v1();
    usernames[id] = user.name;
    console.log('New user added to usernames', usernames);
    io.emit('setUsername', { id: id, name: user.name });
  });

  client.on('setUserVote', (vote) => {
    console.log('Received vote from client', vote);
    for (let song in votes) {
      if (votes[song].indexOf(vote.id) > -1) {
        console.log('Found id');
        let index = song.indexOf(vote.id);
        votes[song].splice(index, 1);
      };
    };
    votes[vote.song].push(vote.id);
    io.emit('votes', { votes: votes });
    console.log(votes);
  });

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
    playlist.push(newSong);
    if (initializing) {
      console.log('Broadcasting playlist data');
      io.emit('updatePlaylist', { data: playlist });
    };
  });

  client.on('getUpNext', () => {
    upNext = [];
    let i = 0;
    if (playlist.length > 2) {
      while (i < 3) {
        let randomSong = playlist[Math.floor(Math.random() * playlist.length)];
        if (randomSong.upNext === true) {
          randomSong = playlist[Math.floor(Math.random() * playlist.length)];
        } else {
          randomSong.upNext = true;
          switch (i) {
            case 0:
              upNext.push({ voteId: 'songOne', data: randomSong });
              i ++;
              break;
            case 1:
              upNext.push({ voteId: 'songTwo', data: randomSong });
              i ++;
              break;
            case 2:
              upNext.push({ voteId: 'songThree', data: randomSong });
              i ++;
              break;
            default:
              break;
          };
        };
        console.log('Sending 3 songs to host', upNext);
        io.emit('updateUpNext', { data: upNext });
      };
    };
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
    userCount --;
    console.log(userCount + ' clients connected!');
    io.emit('updateUserCount', { userCount: userCount });
  });

});