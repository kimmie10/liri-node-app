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

//Twitter
let params = { Kim87185582: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

//Spotify
let userInput = process.argv[2];
console.log(userInput);
spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  //console.log(JSON.stringify(data, null, 2));

  let song = data.tracks.items[0].name;
  let preview = data.tracks.items[0].preview_url;
  console.log("Preview url: " + preview);
  console.log("Song: " + song);


  let artist = data.tracks.items[0].artists[0].name;
  console.log("Artist: " + artist);


  let album = data.tracks.items[0].album.name;
  console.log("Album: " + album);

})

//Omdb via request
/*let args = process.argv;
let movie = "";

for (let i = 2; i < args.length; i++) {
  movie = movie + " " + args[i];
  debugger;
}


request('http://www.omdbapi.com/?t=' + movie + '&plot=full&tomatoes=true&apikey=db708436', function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
  console.log(movie);
});*/

