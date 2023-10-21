const router = require('express').Router();
const { getSong, getSongsByTitle } = require('../queries/get_song');
const Post = require('../models/Post');


router.get('/song', async (req, res) => {
    const id = req.query.id;
    const comment = req.query.comment;
    const song = await getSong(id);

    const songData = {
        // author_id: authorId,
        track: song.name,
        artist: song.artists[0].name,
        album_cover: song.album.images[0].url,
        album_name: song.album.name,
        comment: comment
    }

    // Create a post
    await Post.create(songData);

    res.redirect('/profile');
});

module.exports = router;