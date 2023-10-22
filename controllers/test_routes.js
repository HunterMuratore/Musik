// const router = require('express').Router();
// const { authenticate, isLoggedIn, isAuthenticated } = require('../middleware/authenticate');
// const axios = require('axios');

// async function searchSpotify(title) {
//     const axios = require('axios');

//     const url = 'https://api.spotify.com/v1/search?type=track';
//     const token = 'BQC--5AS79uMkof1pSb0g-7PF-tHXlB3NVS804Ctc2rTM49kia_DrmxLR75gTxpbVIt272tYGtN3766eiXOUzqj2A5khB8uNNzk1kg0j0JEqzfDyOG8';

//     const res = await axios.get(url + `&q=${title}`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         }
//     })
//     return res.data.tracks.items
// }

// router.post('/search', async (req, res) => {
//     const title = req.body.title
//     const tracks = await searchSpotify(title)
//     console.log(tracks)
// })          

// module.exports = router



const router = require('express').Router();
const { authenticate, isLoggedIn, isAuthenticated } = require('../middleware/authenticate');
const axios = require('axios');

async function searchSpotify(artist) {
    const axios = require('axios');

    const url = 'https://api.spotify.com/v1/search?type=artist';
    const token = 'BQBZH5RrKj8RvilYXELbQ_gFqX2ak_02LdGUmqtpbRURmiv7-LCITx473H6cAPdATN7p8P2rjyerrd1jzh1_R5w0keMSVcvBG8nLQhAspJ_8aeHsiH4';

    const res = await axios.get(url + `&q=${artist}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    return res.data.artists.items
}

router.post('/search', async (req, res) => {
    const title = req.body.title
    const artist = await searchSpotify(title)
    console.log(artist)
})          

module.exports = router
