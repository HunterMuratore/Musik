// client id- 43743c2db80a47e19d719147c8da72dc
//client secret- 5f7fe806eccd4cccb17c7be733249cae

const rapidUrl = 'https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv';
const spotifyUrl = 'https://api.spotify.com/v1/browse/categories';

async function fetchSpotifyData() {
    try {
        const response = await fetch(spotifyUrl, {
            'method': 'GET',
            'headers': {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result);
            return result;
        }

        console.log('An error occured with the API');

    } catch (err) {
        console.log(err);
    }
}

fetchSpotifyData();

// try {
//     const response = await fetch(spotifyUrl, {
//         'method': 'GET',
//         'headers': {
//             'X-RapidAPI-Key': '88103c9392mshb329b0956793917p1dcdb6jsnde85ccce0f0c',
//             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//         }
//     });

//     if (response.ok) {
//         const result = await response.text();
//         console.log(result);
//         return result;
//     }

//     console.log('An error occured with the API');

// } catch (err) {
//     console.log(err);
// }