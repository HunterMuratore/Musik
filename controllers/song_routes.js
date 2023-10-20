const { getSong, getSongsByTitle } = require('../queries/get_song');
const Post = require('../models/Post');


router.get('/song', async (req, res) => {
    const id = req.query.id;
    const song = await getSong(id);

    const songData = {
        track: song.name,
        artist: song.artists[0].name,
        album_cover: song.album.images[0],
        album_name: song.album.name,
        comment: req.body.comment
    }

    // Create a post
});