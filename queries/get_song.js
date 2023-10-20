const axios = require('axios');
require('dotenv').config();
const new_token = require('./get_token');
const spotifyUrl = 'https://api.spotify.com/v1/search?type=track';

// Fetch song data from Spotify api
async function getSpotifyData(query) {
    const res = await axios.get(spotifyUrl + `&q=${query}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${new_token}`
        }
    });

    return res.data.tracks;
}

module.exports = { getSpotifyData };


