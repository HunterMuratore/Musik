const axios = require('axios');

let new_token = null;

function getSpotifyToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', '43743c2db80a47e19d719147c8da72dc');
    data.append('client_secret', '5f7fe806eccd4cccb17c7be733249cae');
  
    return axios.post(url, data, { headers })
      .then(response => {
        if (response.status === 200) {
          return response.data.access_token;
        } else {
          console.log('Failed to retrieve token');
          return null;
        }
      }).catch(error => {
        console.error('Failed to retrieve token:', error.message);
        return null;
      });
  }

function refreshToken() {
    getSpotifyToken()
        .then(token => {
            if(token) {
                new_token = token;
            }
        });
}

// Initial token retrieval
refreshToken();

// Set the token to refresh every 45 minutes
setInterval(refreshToken, 45 * 60 * 1000);

module.exports = { new_token };

// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=43743c2db80a47e19d719147c8da72dc&client_secret=5f7fe806eccd4cccb17c7be733249cae"
