const spotifyUrl = 'https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv';

async function fetchSpotifyData() {
    try {
        const response = await fetch(spotifyUrl, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '88103c9392mshb329b0956793917p1dcdb6jsnde85ccce0f0c',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
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
