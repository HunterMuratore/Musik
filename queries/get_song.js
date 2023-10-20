const axios = require('axios');
require('dotenv').config();
const getSpotifyToken = require('./get_token');
const spotifyUrl = 'https://api.spotify.com/v1/search?type=track';

let token;
let time = 45 * 60 * 1000;

function countdown() {
  setInterval(async () => {
    time -= 1000;

    if (time <= 0) {
      token = await getSpotifyToken();
      time = 45 * 60 * 1000;
    }
  }, 1000);
}

// Fetch song data from Spotify api
async function getSongsByTitle(query) {
  token = token ? token : await getSpotifyToken();

  const res = await axios.get(spotifyUrl + `&q=${query}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data.tracks;
}

async function getSong(id) {
  const url = 'https://api.spotify.com/v1/tracks/'

  token = token ? token : await getSpotifyToken();

  const res = await axios.get(url + id, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return res.data;
}

countdown();
// getSong('19YmvsVCetCBeVj6O2mljR').then(data => {
//   console.log(data)
// })

module.exports = { getSongsByTitle, getSong };


