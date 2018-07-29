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


let allFunctions = function (userInput, value) {
  console.log("user " + userInput);
  console.log("val " + value);
  if (userInput === 'my-tweets') {
    twitter();
  } else if (userInput === 'spotify-this-song') {
    spotifyMusic(value);
  } else if (userInput === `movie-this`) {
    movie(value);
  } else if (userInput === `do-what-it-says`) {
    read();
  } else {
    console.log("Input a valid command.")
  };
}

//Twitter
function twitter() {
  let userInput = process.argv[3];
  let params = { screen_name: userInput, count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      //console.log(tweets);
    };
    for (const k in tweets) {
      let name = "\n" + "Name: " + tweets[k].user.name;
      let created = "Date: " + tweets[k].created_at;
      let tweet = "Tweet: " + tweets[k].text + "\n";
      console.log(name);
      console.log(created);
      console.log(tweet);
    };

  });
};


//Spotify
function spotifyMusic(userInput) {
  userInput = process.argv[3];
  spotify.search({ type: 'track', query: userInput, /*limit: 1*/ }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    if (!userInput) {
      userInput = "The Sign by Ace of Base";
    } else {

      let song = data.tracks.items[0].name;
      let preview = data.tracks.items[0].preview_url;
      let artist = data.tracks.items[0].artists[0].name;
      let album = data.tracks.items[0].album.name;
      console.log("Song: " + song);
      console.log("Artist: " + artist);
      console.log("Album: " + album);
      console.log("Preview url: " + preview);
      //console.log(JSON.stringify(data));
    };
  });
};

//Omdb via request
function movie(movie) {


  let args = process.argv;
  movie = "";

  for (let i = 3; i < args.length; i++) {
    if (i > 3 && i < args.length) {
      movie = movie + "+" + args[i];
    } else {
      movie += args[i];
    }
  };
  let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=db708436"

  if (!movie) {
    movie = "Mr. Nobody";
    queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=db708436"
  }

  request(queryURL, function (error, response, body) {
    let object = JSON.parse(body);
    let err = object.Response;
    //console.log(object);
    if (err === "False") {
      console.log(object);
    } else {
      let result = "\n" + "Title: " + object.Title + "\n" + "Year: " + object.Year + "\n" + "IMDB Rating: " + object.imdbRating + "\n" + "Rotten Tomatoes Rating: " + JSON.stringify(object.Ratings[1].Value) + "\n" + "Country Produced: " + object.Country + "\n" + "Language: " + object.Language + "\n" + "Plot: " + object.Plot + "\n" + "Actors: " + object.Actors;
      console.log(result);
    }
  });
};


//do-what-it-says take text from random.txt and does each function
function read() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    //console.log(data);
    if (error) {
      return console.log(error);
    }

    data = data.split(",");
    //console.log(dataArr);
    console.log("use: " + data[0]);
    console.log("val " + data[1]);

    allFunctions(data[0], data[1]);
   
    
  });
}


allFunctions(userInput[2] || null, userInput[3] || null);