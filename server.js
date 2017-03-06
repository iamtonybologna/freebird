const express         = require('express');
const cors            = require('cors');
const http            = require('http');
const app             = express();

app.use(cors());

const server          = require('http').createServer(app);
const io              = require('socket.io')(server);
const uuid            = require('node-uuid');
const config          = require('./config');
const passport        = require('passport');
var TwitterStrategy   = require('passport-twitter').Strategy
  , twitterAuthn
  , twitterAuthz
  , user              = { id: "foo" }
  , OAuth             = require('oauth').OAuth
  , oa
  ;

function initTwitterOauth() {
  oa = new OAuth(
    "https://twitter.com/oauth/request_token"
  , "https://twitter.com/oauth/access_token"
  , config.CONSUMER_KEY
  , config.CONSUMER_SECRET
  , "1.0A"
  , "http://127.0.0.1:3000/authn/twitter/callback"
  , "HMAC-SHA1"
  );
}

// In order to tweet we must have the user's token and secret
// (which we've stored in our poor man's db
// Notice how easy OAuth is, we don't even need a library
// https://dev.twitter.com/docs/api/1/post/statuses/update
function makeTweet(cb) {
  if (!user.token) {
    console.error("You didn't have the user log in first");
  }
  oa.post(
    "https://api.twitter.com/1.1/statuses/update.json"
  , user.token
  , user.tokenSecret
  // We just have a hard-coded tweet for now
  , { "status": "PARTY PARTY PARTY" }
  , cb
  );
}

passport.use(new TwitterStrategy({
    consumerKey: config.CONSUMER_KEY,
    consumerSecret: config.CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    user[profile.id] = profile;
  }
));

io.origins('*:*');

app.use(express.static(`build`));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

let partyButtonCount = 51;

// Redirect the user to Twitter for authentication. When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval. Finish the
// authentication process by attempting to obtain an access token. If
// access was granted, the user will be logged in. Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.get('/party', (req, res) => {
  if (partyButtonCount > 50) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

// This is where we handle the tweet link
// (which should have been a form with user input)
app.get('/twitter/tweet', function (req, res) {
  makeTweet(function (error, data) {
    if (error) {
      console.log(require('sys').inspect(error));
      res.end('bad stuff happened, negative on the tweetage');
    } else {
      console.log(data);
      res.end('go check your tweets!');
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + `/build/index.html`);
});

let PORT = process.env.PORT || config.PORT;
server.listen(PORT);
console.log(`Server listening on port: ${PORT}`);

let initializing = true;
let userCount = 0;
let usernames = {};
let votes = {};              // votes = { songId: [userId, userId, userId] }
let upNext = [];
let playlist = [];
let playedSongs = [];


newUpNext = () => {
  // store songs that were just voted on and clear votes
  for (let songId in votes) {
    playedSongs.push(songId);
  }
  console.log('playedSongs', playedSongs);
  votes = {};
  let newSongs = {};
  if (playlist.length > 2) {
    let i = 0;
    while (i < 3) {
      let randomSong = playlist[Math.floor(Math.random() * playlist.length)];
      if (newSongs.hasOwnProperty(randomSong.songId) === false) {
        // add this to if statement to check against songs that were voted on
        // && playedSongs.indexOf(randomSong.songId) === -1
        newSongs[randomSong.songId] = randomSong;
        i++;
      };
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

  // set username
  client.on('setUsername', (user, fn) => {
    console.log('Received username from client', user);
    let id = uuid.v1();
    usernames[id] = user.name;
    console.log('New user added to usernames', usernames);
    fn(id);
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

  // grab 3 new, random songs from playlist, add to voting list, send to host and users
  client.on('getUpNext', () => {
    // get 3 new, random songs, clear upNext, and add those songs to upNext
    newUpNext();
  });

  // partyButton listener and conditional partyOn switch
  client.on('partyButton', () => {
    partyButtonCount++;
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
    userCount--;
    console.log(userCount + ' clients connected!');
    io.emit('updateUserCount', { userCount: userCount });
  });

});
