const express       = require('express');
const cors          = require('cors');
const http          = require('http');
const app           = express();

app.use(cors());

const server        = require('http').createServer(app);
const io            = require('socket.io')(server);
const uuid          = require('node-uuid');
const config        = require('./config');
const cookieParser  = require('cookie-parser');

app.use(cookieParser());

io.origins('*:*');

app.use(express.static(`build`));

app.get('/assets/:id', (req,res) => {
  res.sendFile(__dirname + `/assets/` + req.params.id);
});

app.get('/party', (req, res) => {
  if (partyButtonCount > partyButtonCountLimit) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + `/build/index.html`);
});

let PORT = process.env.PORT || config.PORT;
server.listen(PORT);
console.log(`Server listening on port: ${PORT}`);

let userCount = 0;
let usernames = {};           // username = { id: username }
let votes = {};               // votes = { songId: [userId, userId, userId] }
let upNext = [];
let playlist = [];
let lastUpNextList = [];
let readyToParty = false;
let partyButtonCount = 0;
let partyButtonCountLimit = 50;

newUpNext = () => {
  // store songs that were just voted on and clear votes
  lastUpNextList = [];
  for (let songId in votes) {
    lastUpNextList.push(songId);
  };
  votes = {};
  let newSongs = {};
  let playableSongsLeft = 0;
  playlist.forEach((song) => {
    if (song.played == false) {
      playableSongsLeft++;
    }
  });
  if (playableSongsLeft > 3) {
    let i = 0;
    let x = 0;
    while (i < 3 && x < 100) {
      let randomSong = playlist[Math.floor(Math.random() * playlist.length)];
      if (
        newSongs.hasOwnProperty(randomSong.songId) === false &&
        lastUpNextList.indexOf(randomSong.songId) === -1 &&
        randomSong.played === false
        )
      {
        newSongs[randomSong.songId] = randomSong;
        i++;
      };
      x++;
    };
    upNext = [];
    for (let song in newSongs) {
      upNext.push(newSongs[song]);
      votes[song] = [];
    };
    console.log('Broadcasting new upNext list');
    io.emit('updateUpNext', { data: upNext });
  } else {
    let i = 0;
    let x = 0;
    while (i < 3 && x < 100) {
      let randomSong = playlist[Math.floor(Math.random() * playlist.length)];
      if (newSongs.hasOwnProperty(randomSong.songId) === false) {
        newSongs[randomSong.songId] = randomSong;
        i++;
      };
      x++;
    };
    upNext = [];
    for (let song in newSongs) {
      upNext.push(newSongs[song]);
      votes[song] = [];
    };
    console.log('Broadcasting new upNext list');
    io.emit('updateUpNext', { data: upNext });
  };
};

io.on('connection', (client) => {

  console.log('New Client Connected');
  userCount++;
  console.log(userCount + ' clients connected!');
  io.emit('updateUserCount', { userCount: userCount });
  io.emit('updatePlaylist', { data: playlist, remove: true });
  io.emit('updateUpNext', { data: upNext });
  io.emit('votes', { votes: votes });
  if (readyToParty) {
    io.emit('readyToParty');
  };

  // set username
  client.on('setUsername', (user, fn) => {
    console.log('Received username from client', user);
    let id = uuid.v1();
    usernames[id] = user.name;
    console.log('New user added to usernames', usernames);
    fn(id);
    io.emit('updateUpNext', { data: upNext });
    io.emit('sendName', { name: user.name });
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
      }
    }
    if (votes[vote.songId]) {
      votes[vote.songId].push(vote.userId);
    } else {
      votes[vote.songId] = [vote.userId];
    }
    io.emit('votes', { votes: votes });
    console.log('Updated votes', votes);
  });

  // add new song
  client.on('addNewSong', (songData) => {
    console.log('Received new song from client');
    let newSong = {
      uploader: songData.userId,
      uploaderName: songData.username,
      songId: songData.songId,
      songTitle: songData.songTitle,
      songImageMedium: songData.songImageMedium,
      songImageHigh: songData.songImageHigh,
      upNext: false,
      played: false
    };
    // check if song is in playlist
    let songInPlaylist = false;
    let songInPlaylistUploader = '';
    let songInPlaylistArrayPosition = 0;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].songId === newSong.songId) {
        songInPlaylist = true;
        songInPlaylistUploader = playlist[i].uploader;
        songInPlaylistArrayPosition = i;
      }
    }
    // if song is not in playlist, add to playlist
    if (!songInPlaylist) {
      playlist.push(newSong);
      console.log('Broadcasting playlist data');
      io.emit('sendNewSong', { song: newSong });
      io.emit('updatePlaylist', { data: playlist, remove: false });
    } else {
      console.log('Song found in playlist');
      if (newSong.uploader === songInPlaylistUploader) {
        console.log('Uploader id matches song in playlist uploader id');
        playlist.splice(songInPlaylistArrayPosition, 1);
        io.emit('updatePlaylist', { data: playlist, remove: true });
      } else {
        io.emit('updatePlaylist', { data: playlist, remove: false });
      }
    }
  });

  // grab 3 new, random songs from playlist, add to voting list, send to host and users
  client.on('getUpNext', () => {
    // get 3 new, random songs, clear upNext, and add those songs to upNext
    newUpNext();
    io.emit('upNextResetWinner');
  });

  // start party button
  client.on('startParty', ()=> {
    readyToParty = true;
    io.emit('readyToParty');
  });

  // partyButton listener and conditional partyOn switch
  client.on('partyButton', () => {
    console.log('PARTYPARTYPARTY', partyButtonCount);
    partyButtonCount++;
    io.emit('partyButton', { partyButtonCount: partyButtonCount, partyButtonCountLimit: partyButtonCountLimit });
  });

  // send username back to users with cookies
  client.on('getUsername', (userId, fn) => {
    let name = '';
    console.log('getUsername message received from client, checking IDs');
    for (let id in usernames) {
      if (id == userId.userId) {
        console.log('Cookie id matches local id, sending name', usernames[id]);
        name = usernames[id];
        fn(name, upNext);
      };
    };
    io.emit('name', { name: name });
    console.log('Emitted name', name);
  });

  // flip played boolean if song won
  client.on('newWinner', (newWinner) => {
    io.emit('winner', { songId: newWinner.songId });
    console.log('New winner song id', newWinner.songId);
    playlist.forEach((song) => {
      if (song.songId === newWinner.songId) {
        song.played = true;
        console.log('played?', song.played);
      };
    });
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
    userCount--;
    console.log(userCount + ' clients connected!');
    io.emit('updateUserCount', { userCount: userCount });
  });

});
