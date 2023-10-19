/* curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=43743c2db80a47e19d719147c8da72dc&client_secret=5f7fe806eccd4cccb17c7be733249cae" 
*/

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
