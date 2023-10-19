const axios = require('axios');
const token = '';
const spotifyUrl = 'https://api.spotify.com/v1/search?type=track';

async function fetchSpotifyData() {
    axios.get(spotifyUrl + '&q=hungry like the wolf', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        console.log(res.data.tracks.items[0].album.images);
        console.log(res.data.tracks.items.length);
      });
}

fetchSpotifyData();
