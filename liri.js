//API variables

require("dotenv").config();
let Twitter = require("twitter");
let Spotify = require("node-spotify-api");
let request = require("request");
let fs = require("fs");
//Variable for keys to be used for Twitter and Spotify
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let userInput = process.argv;

if (userInput[2] === 'my-tweets') {
  twitter();
} else if (userInput[2] === 'spotify-this-song') {
  spotifyMusic();
} else if (userInput[2] === `movie-this`) {
  movie();
} else if (userInput[2] === `do-what-it-says`) {
  says();
} else {
  console.log("Input a valid command.")
};


function log(input) {
  console.log(JSON.stringify(input));
};


//Twitter
function twitter() {

  let params = {screen_name: userInput[3], count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
    };
    for (const k in tweets) {
      let created = "\n" + "Date: " + tweets[k].created_at;
      let tweet = "Tweet: " + tweets[k].text + "\n";
      console.log(created);
      console.log(tweet);
    };

  });
};


//Spotify
function spotifyMusic() {
  console.log(userInput[3]);
  spotify.search({ type: 'track', query: userInput[3], limit: 1 }, function (err, data) {
    console.log("spotify came back.")
    if (err) {
     console.log('Error occurred: ' + err);
     
    }
  
    //console.log(JSON.stringify(data.tracks.items[0].name, null, 2));

    let song = data.tracks.items[0].name;
    let preview = data.tracks.items[0].preview_url;
    let artist = data.tracks.items[0].artists[0].name;
    let album = data.tracks.items[0].album[0].name;
    console.log("Song: " + song);
    console.log("Artist: " + artist);
    console.log("Album: " + album);
    console.log("Preview url: " + preview);
    return;
  });
};

//Omdb via request
function movie() {


  let args = process.argv;
  let movie = "";

  for (let i = 2; i < args.length; i++) {
    movie = movie + " " + args[i];
    debugger;
  };


  request('http://www.omdbapi.com/?t=' + movie + '&plot=full&tomatoes=true&apikey=db708436', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    console.log(movie);
  });
};

